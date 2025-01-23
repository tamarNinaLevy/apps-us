const { useState } = React

import { ComposeMail } from "./ComposeMail.jsx"

export function EmailActionsSideBar({ categories, setMails, setCategories, setFilterPageBy }) {

    const names = ['all', 'unread', 'drafts', 'trash']
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
                names.map((cat) => {
                    return <div className="category" key={cat}>
                        <input type="button" value={cat} onClick={() => getFilteredEmails(cat)} /> <span>{categories[cat].count}</span>
                    </div>
                })
            }
        </div>
        <ComposeMail isOpen={isOpen} setIsOpen={setIsOpen} setMails={setMails} />
    </div>
}