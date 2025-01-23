const { useState, useEffect } = React
const { useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { ComposeMail } from "./ComposeMail.jsx"
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, setSelectedMailInfo, deleteMail, setMails }) {

    const navigate = useNavigate()

    const [isOpen, setIsOpen] = useState(false)
    const [draft, setDraft] = useState({ to: '', subject: '', body: '', })

    function onClickMark(event, id, newVal) {
        setSelectedMailInfo({ mailId: id, propName: event.target.name, newVal })
    }

    function viewMail(id) {
        navigate(`/view-mail/${id}`)
    }

    function onDelete(mailId, removedAt) {
        if (removedAt) {
            mailService.remove(mailId)
                .then((res) => {
                    setMails(prev => {
                        return prev.filter((mail) => mail.id !== mailId)
                    })
                    alert('Deleted successfully!')
                })
                .catch((err) => {
                    console.log('ERR: ', err);
                })
        } else {
            deleteMail(id)
        }
    }

    function editDraft(mail) {
        setIsOpen(true)
        setDraft(mail)
    }

    function favorite(mail) {
        mailService.updatePropInMail(mail.id, 'isFavorite', !mail.isFavorite)
            .then((updatedMail) => {
                alert('Success')
                setMails(prev => {
                    const copy = [...prev]
                    const idx = copy.findIndex(({ id }) => id === mail.id)
                    copy.splice(idx, 1, updatedMail)
                    return copy
                })
            })
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    return <div className="mail-list">
        {mails.map((mail, index) => {
            return <div className="mail-preview-container flex row align-center" key={mail.id || index}>
                <div className="star span-margin" onClick={() => favorite(mail)}>
                    <img src={`assets/img/${mail.isFavorite ? 'star-yellow.svg' : 'start-2-icon.svg'}`} />
                </div>
                <MailPreview
                    mail={mail}
                />
                <input type="button" value={'view'} onClick={() => viewMail(mail.id)} />
                {
                    mail.sentAt !== null ?
                        <input
                            type="button"
                            id={mail.id}
                            name='isRead'
                            value={mail.isRead ? 'Mark as unread' : 'Mark as read'}
                            onClick={(event) => onClickMark(event, mail.id, mail.isRead ? false : true)}
                        /> :
                        <input
                            type="button"
                            value="Edit"
                            onClick={() => editDraft(mail)}
                        />
                }
                <input type="button" value={'delete'} onClick={() => onDelete(mail.id, mail.removedAt)} />
            </div>
        })}
        <ComposeMail
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setMails={setMails}
            mail={draft}
        />
    </div>
}
