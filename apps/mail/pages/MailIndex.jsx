const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {

    const [mails, setMails] = useState([])

    useEffect(() => {
        loadMails()
    }, [])

    function loadMails() {
        console.log('Loading')
        mailService.query()
            .then(setMails)
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    return <div className='mail-index-container'>
        <h1>mail app</h1>
        {mails.length > 0 && <MailList mails={mails} />}
    </div>
}

