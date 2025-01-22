export function MailPreview({ mail }) {

    const txtBody = mail.body.substring(0, mail.body.length > 25 ? 25 : mail.body.length) + (mail.body.length > 25 ? '...' : '')

    return <div className='preview-container' key={mail.id}>
        <span className="bold-font span-margin">{mail.from}</span> <br />
        <span className="bold-font span-margin">{mail.subject}</span> <br />
        <span className="span-margin">{txtBody}</span> <br />
        <span className="span-margin">{mail.createdAt}</span> <br />
    </div>
}