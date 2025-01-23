const { useEffect, useState } = React

import { MailList } from '../cmps/MailList.jsx'
import { MailHeader } from '../cmps/MailHeader.jsx'
import { EmailActionsSideBar } from '../cmps/EmailActionsSideBar.jsx'

import { mailService } from '../services/mail.service.js'

export function MailIndex() {

    const [mails, setMails] = useState([])
    const [selectedMailInfo, setSelectedMailInfo] = useState(null)

    const [categories, setCategories] = useState({
        unread: 0,
        drafts: 0,
        trash: 0
    })

    const [filterPageBy, setFilterPageBy] = useState({
        unread: false,
        drafts: false,
        trash: false
    })

    useEffect(() => {
        loadMails()
    }, [filterPageBy])

    useEffect(() => {
        if (selectedMailInfo) {
            onClickMark()
        }
    }, [selectedMailInfo])

    useEffect(() => {
        mails.length > 0 && setCategories(prev => {
            return { ...prev, read: mailService.countUnraed(mails) }
        })
        // if (mails.length > 0 && !mails[mails.length - 1].id) {
        loadMails()
        // }
    }, [mails])

    function loadMails() {
        mailService.query(filterPageBy)
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

    function deleteMail(mailId) {
        console.log("mailId: ", mailId)
        mailService.removeToTrash(mailId)
            .then((res) => {
                alert('Removed to trash succesfully!')
                setMails((prev) => {
                    const idx = prev.findIndex((mail) => mail.id === mailId)
                    prev.splice(idx, 1)
                    return prev
                })
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
                />
            }
            <EmailActionsSideBar
                categories={categories}
                setMails={setMails}
                setFilterPageBy={setFilterPageBy}
            />
        </div>
    </div>
}