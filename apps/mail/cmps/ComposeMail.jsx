const { useState } = React

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

export function ComposeMail({ isOpen, setIsOpen, setMails }) {

    const [composedMail, setComposedMail] = useState({ to: '', subject: '', body: '', })

    function onClose() {
        setIsOpen(!setIsOpen)
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
                from: 'momo@momo.com',
            }
            mailService.save(newMail)
                .then((mail) => {
                    setMails(prev => {
                        return [...prev, { ...newMail, id: mail.id }]
                    })
                    onClose()
                    alert('Added mail successfully')
                })
                .catch(err => {
                    console.log('ERR: ', err)
                })
        }
    }

    function saveDraft() {
        console.log('Saving draft...')
        const newDraft = {
            ...composedMail,
            createdAt: new Date(),
            isRead: false,
            sentAt: null,
            removedAt: null,
            from: 'momo@momo.com',
        }
        mailService.save(newDraft)
            .then((res) => {
                // setMails(prev => [...prev])
                onClose()
                alert('Saved draft successfully!')
            })
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className="compose-container">
            <span>New message</span>
            <form onSubmit={(event) => submitMail(event)} className='form flex column align-center justify-center'>
                <input className="input title" type="text" name="to" id="to" onInput={onInput} placeholder="To" />
                <input className="input" type="text" name="subject" id="subject" onInput={onInput} placeholder="Subject" />
                <input className="input body-txt" type="text" name="body" id="body" onInput={onInput} placeholder="Body" />
                <div className="flex row align-center justify-center">
                    <input className="span-margin" type="submit" value="submit" />
                    <input className="span-margin" type="button" name="draft" value="save draft" onClick={saveDraft} />
                </div>
            </form>
        </div>
    </Modal>
}