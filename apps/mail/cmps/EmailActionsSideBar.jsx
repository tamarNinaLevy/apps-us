const { useState } = React

import { ComposeMail } from "./ComposeMail.jsx"

export function EmailActionsSideBar({ categories, setMails }) {

    const names = ['read']
    const [isOpen, setIsOpen] = useState(false)

    function onCompose() {
        console.log('Composing')
        setIsOpen(true)
    }

    return <div className="categories-list flex column align-center flex-start">
        <input type="button" value='Compose' onClick={onCompose} />
        <div className="filter-by-list">
            {
                names.map((cat) => {
                    return <div className="category" key={cat}>
                        <span>{cat}</span><span>{categories[cat]}</span>
                    </div>
                })
            }
        </div>
        <ComposeMail isOpen={isOpen} setIsOpen={setIsOpen} setMails={setMails}/>
    </div>
}