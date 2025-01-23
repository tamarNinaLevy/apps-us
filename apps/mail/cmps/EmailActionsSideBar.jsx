const { useState } = React

import { ComposeMail } from "./ComposeMail.jsx"

export function EmailActionsSideBar({ setMails, setFilterPageBy, unread }) {

    const names = ['all', 'unread', 'drafts', 'trash', 'favorites']
    const [isOpen, setIsOpen] = useState(false)

    function onCompose() {
        setIsOpen(true)
    }

    function getFilteredEmails(category) {
        setFilterPageBy(prev => {
            const copy = { ...prev }
            for (let key in copy) {
                if (key === category)
                    copy[key] = true
                else
                    copy[key] = false
            }
            return copy
        })
    }

    return <div className="categories-list flex column align-center flex-start">
        <input type="button" value='Compose' onClick={onCompose} />
        <div className="filter-by-list">
            {
                names.map((cat, index) => {
                    return <div className="category" key={cat}>
                        <input type="button" value={cat} onClick={() => getFilteredEmails(cat)} />
                        {index === 0 && <span className="span-margin">{unread}</span>}
                    </div>
                })
            }
        </div>
        <ComposeMail isOpen={isOpen} setIsOpen={setIsOpen} setMails={setMails} />
    </div>
}