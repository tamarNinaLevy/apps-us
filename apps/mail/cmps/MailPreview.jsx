export function MailPreview({ mail }) {

    const txtBody = mail && mail.body && mail.body.substring(0, mail.body.length > 15 ? 15 : mail.body.length) + (mail.body.length > 25 ? '...' : '')

    const bold = !mail.isRead ? 'bold-font' : ''

    function formatTime(millis) {
        const date = new Date(millis)
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}`
    }

    const time = formatTime(mail.createdAt)

    return <div className='preview-container' key={mail.id}>
        <span className={`span-margin ${bold} small-detail`}>{mail.from}</span> <br />
        <span className="email-detail flex row align-center justify-center">
            <span className={`span-margin ${bold} font-gray`}>{mail.subject} - </span>
            <span className="span-margin">{txtBody}</span>
        </span>
        <span className="span-margin small-detail">{time}</span> <br />
    </div>
}