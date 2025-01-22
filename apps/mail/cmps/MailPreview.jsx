export function MailPreview({ mail }) {
    return <div key={mail.id}>
        <span>{mail.createdAt}</span> <br />
        <span>{mail.subject}</span> <br />
        <span>{mail.body}</span> <br />
        <span>{mail.sentAt}</span> <br />
        <span>{mail.from}</span> <br />
        <span>{mail.to}</span> <br />
    </div>
}