export function MailPreview({ mail }) {

    const txtBody = mail.body.substring(0, mail.body.length > 25 ? 25 : mail.body.length) + (mail.body.length > 25 ? '...' : '')

    const bold = !mail.isRead ? 'bold-font' : ''

    return <div className='preview-container' key={mail.id}>
        <span className={`span-margin ${bold}`}>{mail.from}</span> <br />
        <span className={`span-margin ${bold} font-gray`}>{mail.subject}</span> <br />
        <span className="span-margin">{txtBody}</span> <br />
        <span className="span-margin">{mail.createdAt}</span> <br />
    </div>
}