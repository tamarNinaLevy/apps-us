const { useNavigate } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, setSelectedMailInfo, deleteMail }) {

    const navigate = useNavigate()

    function onClickMark(event, id, newVal) {
        setSelectedMailInfo({ mailId: id, propName: event.target.name, newVal })
    }

    function viewMail(id) {
        navigate(`/view-mail/${id}`)
    }

    function onDelete(id) {
        console.log("deleting id: ", id);
        deleteMail(id)
    }

    return <div className="mail-list">
        {mails.map((mail, index) => {
            return <div className="mail-preview-container flex row align-center" key={mail.id || index}>
                <MailPreview
                    mail={mail}
                />
                <input type="button" value={'view'} onClick={() => viewMail(mail.id)} />
                <input type="button" id={mail.id} name='isRead' value={mail.isRead ? 'Mark as unread' : 'Mark as read'} onClick={(event) => onClickMark(event, mail.id, mail.isRead ? false : true)} />
                <input type="button" value={'delete'} onClick={() => onDelete(mail.id)} />
            </div>
        })}
    </div>
}
