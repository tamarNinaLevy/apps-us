const { useEffect, useState } = React

import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { EmailActionsSideBar } from '../cmps/EmailActionsSideBar.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [selectedMailInfo, setSelectedMailInfo] = useState(null)
    const [categories, setCategories] = useState({
        read: 0,
    })

    useEffect(() => {
        loadMails()
    }, [])

    useEffect(() => {
        if (selectedMailInfo) {
            onClickMark()
        }
    }, [selectedMailInfo])

    useEffect(() => {
        mails.length > 0 && setCategories(prev => {
            return { ...prev, read: mailService.countUnraed(mails) }
        })
    }, [mails])

    function loadMails() {
        mailService.query()
            .then((res) => {
                setMails(res)
            })
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    function onClickMark() {
        mailService.updatePropInMail(selectedMailInfo.mailId, selectedMailInfo.propName, selectedMailInfo.newVal)
            .then(() => {
                alert('Success')
                setSelectedMailInfo(null)
                loadMails()
            })
            .catch(err => {
                console.log('ERR: ', err)
                alert('Error occurred')
            })
    }

    return <div className='mail-index-container'>
        <MailHeader />
        <div className='list-categories-container'>
            {mails.length > 0 && <MailList mails={mails} setSelectedMailInfo={setSelectedMailInfo} />}
            <EmailActionsSideBar categories={categories} />
        </div>
    </div>
}