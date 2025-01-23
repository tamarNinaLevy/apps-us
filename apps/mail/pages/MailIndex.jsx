const { useEffect, useState } = React

import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { EmailActionsSideBar } from '../cmps/EmailActionsSideBar.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [selectedMailInfo, setSelectedMailInfo] = useState(null)
    const [unread, setUnread] = useState(0)

    const [filterPageBy, setFilterPageBy] = useState({
        unread: false,
        drafts: false,
        trash: false,
        all: true,
        favorites: true
    })

    useEffect(() => {
        loadMails()
        countUnread()
    }, [filterPageBy])

    useEffect(() => {
        if (selectedMailInfo) {
            onClickMark()
        }
    }, [selectedMailInfo])

    function loadMails() {
        mailService.query(filterPageBy)
            .then((res) => {
                setMails(res)
                countUnread()
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

    function countUnread() {
        return mailService.countUnread()
            .then((res) => {
                setUnread(res)
            })
            .catch((err) => {
                console.log('ERR: ', err)
            })
    }

    function deleteMail(mailId) {
        mailService.removeToTrash(mailId)
            .then((res) => {
                alert('Removed to trash succesfully!')
                setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
            })
            .catch(err => {
                console.log('ERR: ', err)
            })
    }

    return <div className='mail-index-container'>
        <MailHeader />
        <div className='list-categories-container'>
            {
                mails.length > 0 &&
                <MailList
                    mails={mails}
                    setSelectedMailInfo={setSelectedMailInfo}
                    deleteMail={deleteMail}
                    setMails={setMails}
                />
            }
            <EmailActionsSideBar
                setMails={setMails}
                filterPageBy={filterPageBy}
                setFilterPageBy={setFilterPageBy}
                unread={unread}
            />
        </div>
    </div>
}