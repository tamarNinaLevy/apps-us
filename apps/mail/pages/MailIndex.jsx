const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { EmailCategories } from '../cmps/EmailCategories.jsx'

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
        <MailHeader />
        <div className='list-categories-container'>
            {mails.length > 0 && <MailList mails={mails} />}
            <EmailCategories />
        </div>
    </div>
}

