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


export function ComposeMail({ isOpen, setIsOpen, setMails }) {

    const [composedMail, setComposedMail] = useState({ subject: '', body: '' })

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
            mailService.save(composedMail)
                .then((res) => {
                    setMails(prev => [...prev, composedMail])
                    alert('Added mail successfully')
                })
                .catch(err => {
                    console.log('ERR: ', err)
                })
        }
    }

    function saveDraft() {
        console.log('Saving draft...')
    }

    return <Modal isOpen={isOpen} onClose={onClose}>
        <div className="compose-container">
            <h1>Add mail</h1>
            <form onSubmit={(event) => submitMail(event)}>
                <input type="text" name="subject" id="subject" onInput={onInput} placeholder="subject" />
                <input type="text" name="body" id="body" onInput={onInput} placeholder="body" />
                <input type="submit" value="submit" />
                <input type="button" name="draft" value="save draft" onClick={saveDraft} />
            </form>
        </div>
    </Modal>
}