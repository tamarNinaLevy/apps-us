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
    updatePropInMail
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(cars => {
            return cars
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
            mail[propName] = newVal
            save(mail)
            return mail
        })
        .catch((err) => {
            return err
        })
}

function countUnraed(mails) {
    const unread = mails.filter((mail) => !mail.isRead)
    return unread.length
}

function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = []
        for (let i = 0; i < 20; i++) {
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
        to: 'user@appsus.com'
    }
}