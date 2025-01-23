import { loadFromStorage, makeId, saveToStorage, makeLorem } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const MAIL_KEY = 'mail_db'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    countUnraed,
    updatePropInMail,
    removeToTrash
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.trash) {
                return mails.filter((mail) => mail.removedAt !== null)
            }
            if (filterBy.drafts) {
                return mails.filter((mail) => mail.sentAt === null && mail.removedAt === null)
            }
            if (filterBy.unread) {
                return mails.filter((mail) => !mail.isRead && mail.removedAt === null && mail.sentAt !== null)
            }
            if (filterBy.all) {
                return mails.filter((mail) => mail.removedAt === null && mail.sentAt !== null)
            }
            return mails;
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            return mail
        })
}

function remove(mailId) {
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}

function updatePropInMail(mailId, propName, newVal) {
    return storageService.get(MAIL_KEY, mailId)
        .then(mail => {
            const copy = { ...mail }
            copy[propName] = newVal
            return save(copy)
        })
        .catch((err) => {
            return err
        })
}

function countUnraed(mails) {
    const unread = mails.filter((mail) => !mail.isRead)
    return unread.length
}

function removeToTrash(mailId) {
    return storageService.get(MAIL_KEY, mailId)
        .then((mail) => {
            mail.removedAt = new Date()
            return save(mail)
        })
        .catch(err => {
            console.log(err)
        })
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 3; i++) {
            mails.push(_createMail())
        }
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail() {
    return {
        id: makeId(),
        createdAt: new Date(),
        subject: makeLorem(3),
        body: makeLorem(5),
        isRead: false,
        sentAt: new Date(),
        removedAt: null,
        from: 'momo@momo.com',
        to: 'user@appsus.com',
    }
}