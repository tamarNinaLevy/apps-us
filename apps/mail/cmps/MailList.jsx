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

import { MailPreview } from "./MailPreview.jsx"

export function MailList({ mails, setSelectedMailId }) {

    function onClickMark(event, id, newVal) {
        setSelectedMailId({ mailId: id, propName: event.target.name, newVal })
    }

    return <div className="mail-list">
        {mails.map((mail) => {
            return <div className="mail-preview-container flex row align-center" key={mail.id}>
                <MailPreview
                    key={mail.id}
                    mail={mail}
                />
                <input type="button" id={mail.id} name='isRead' value={mail.isRead ? 'Mark as unread' : 'Mark as read'} onClick={(event) => onClickMark(event, mail.id, !mail.isRead)} />
            </div>
        })}
    </div>
}
