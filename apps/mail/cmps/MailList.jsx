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

export function MailList({ mails }) {

    return <div className="mail-list">
        {mails.map((mail) => {
            return <div className="mail-preview-container">
                <MailPreview
                    key={mail.id}
                    mail={mail}
                />
            </div>
        })}
    </div>
}
