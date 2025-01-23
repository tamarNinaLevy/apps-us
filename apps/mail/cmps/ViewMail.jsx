const { useEffect, useState } = React

const { useParams } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export function ViewMail() {

    const { mailId } = useParams()

    const [mail, setMail] = useState(null)

    useEffect(() => {
        loadMail()
        getMailKeys()
    }, [mailId])

    function loadMail() {
        mailService.get(mailId)
            .then(setMail)
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    const keys = getMailKeys()

    function getMailKeys() {
        const keys = []
        for (let key in mail) {
            keys.push(key)
        }
        return keys
    }

    return <div className="view-mail-container">
        <h1>hello view</h1>
        {
            keys.map((key) => {
                return <div className="key-val-dtl" key={mail.id}>
                    <span>{key}:</span>
                    <span>{mail[key]}</span>
                    <br />
                </div>
            })
        }
    </div>
}