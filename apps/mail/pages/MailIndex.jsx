const { useEffect, useState } = React

import { mailService } from '../services/mail.service.js'

import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { EmailCategories } from '../cmps/EmailCategories.jsx'

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [categories, setCategories] = useState({
        read: 0,
    })

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        setCategories(prev => {
            return { ...prev, read: mailService.countUnraed(mails) }
        })
    }, [mails])

    function loadMails() {
        console.log('Loading...')
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
            <EmailCategories categories={categories} />
        </div>
    </div>
}

