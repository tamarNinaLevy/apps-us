const { useState, useEffect } = React

import { Modal } from '../../../cmps/Modal.jsx'

import { mailService } from '../services/mail.service.js'

// {
//      id: makeId(),
//      createdAt: new Date(),
//      subject: makeLorem(3),
//      body: makeLorem(5),
//      isRead: false,
//      sentAt: new Date(),
//      removedAt: null,
//      from: 'momo@momo.com',
//      to: 'user@appsus.com'
// }

export function ComposeMail({ isOpen, setIsOpen, setMails, mail }) {

    const [composedMail, setComposedMail] = useState({ to: '', subject: '', body: '', })

    useEffect(() => {
        if (mail) {
            setComposedMail(mail)
        }
    }, [mail])

    function closeModal() {
        setIsOpen(!setIsOpen)
        setComposedMail({ to: '', subject: '', body: '', })
    }

    function onInput(event) {
        const key = event.target.name
        const value = event.target.value
        setComposedMail(prev => {
            const copy = { ...prev }
            copy[key] = value
            return { ...copy }
        })
    }

    function validateMail() {
        const emptyInputs = []
        for (let key in composedMail) {
            if (composedMail[key] === '') {
                emptyInputs.push(composedMail[key])
            }
        }
        return emptyInputs
    }

    function submitMail(event) {
        event.preventDefault()
        const emptyInputs = validateMail()
        if (emptyInputs.length > 0) {
            alert('Empty input')
            return
        } else {
            const newMail = {
                ...composedMail,
                createdAt: new Date(),
                isRead: false,
                sentAt: new Date(),
                removedAt: null,
                from: 'tamarlevy2002@gmail.com',
            }
            mailService.save(newMail)
                .then((mail) => {
                    //if submit is from draft with id
                    if (composedMail.id) {
                        setMails(prev => {
                            const copy = [...prev]
                            const idx = prev.findIndex((mail) => {
                                mail.id === composedMail.id
                            })
                            copy.splice(idx, 1, newMail)
                            return copy
                        })
                    } else {
                        setMails(prev => {
                            return [...prev, { ...newMail, id: mail.id }]
                        })
                    }
                    closeModal()
                    alert('Added mail successfully')
                })
                .catch(err => {
                    console.log('ERR: ', err)
                })
        }
    }

    function saveDraft() {
        const emptyInputs = validateMail()
        if (emptyInputs.length === 3) {
            closeModal()
            return
        }
        const newDraft = {
            ...composedMail,
            createdAt: new Date(),
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'tamarlevy2002@gmail.com',
        }
        mailService.save(newDraft)
            .then((res) => {
                //if in edit draft with id then replace
                if (newDraft.id) {
                    setMails(prev => {
                        const copy = [...prev]
                        const idx = prev.findIndex((mail) => {
                            mail.id === newDraft.id
                        })
                        copy.splice(idx, 1, newDraft)
                        return copy
                    })
                }
                closeModal()
                alert('Saved draft successfully!')
            })
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    return <Modal isOpen={isOpen} onClose={saveDraft}>
        <div className="compose-container">
            <span>New message</span>
            <form onSubmit={(event) => submitMail(event)} className='form flex column align-center justify-center'>
                <input className="input title" type="text" name="to" id="to" onInput={onInput} placeholder="To" defaultValue={composedMail.to || ''} />
                <input className="input" type="text" name="subject" id="subject" onInput={onInput} placeholder="Subject" defaultValue={composedMail.subject || ''} />
                <input className="input body-txt" type="text" name="body" id="body" onInput={onInput} placeholder="Body" defaultValue={composedMail.body || ''} />
                <div className="flex row align-center justify-center">
                    <input className="span-margin" type="submit" value="submit" />
                </div>
            </form>
        </div>
    </Modal>
}