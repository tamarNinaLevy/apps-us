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

import { mailService } from "../services/mail.service.js";
import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails }) {

    function onClickMark(event, mail) {
        const key = event.target.name
        mail[key] = !mail.isRead
        mailService.save(mail)
            .then((res) => {
                alert('Success')
            })
            .catch(err => {
                console.log('ERR: ', err)
                alert('Error occurred')
            })
    }

    return <div className="mail-list">
        {mails.map((mail) => {
            return <div className="mail-preview-container flex row align-center" key={mail.id}>
                <MailPreview
                    key={mail.id}
                    mail={mail}
                />
                <input type="button" id={mail.id} name='isRead' value={mail.isRead ? 'Unmark' : 'Mark as read'} onClick={(event) => onClickMark(event, mail)} />
            </div>
        })}
    </div>
}
