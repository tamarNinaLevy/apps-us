const { useState, useEffect } = React

import { Modal } from "../../../cmps/Modal.jsx";

export function SearchInput() {

    const [open, setOpen] = useState(false)

    const [searchBy, setSearchBy] = useState({
        subject: false,
        body: false
    })

    const [searchVal, setSearcVal] = useState({
        subject: '',
        body: ''
    })

    useEffect(() => {
        console.log("searchVal: ", searchVal)
    }, [searchVal])

    function toggleFilterForm() {
        setOpen(!open)
    }

    function onSearch() {

    }

    function onInput(event) {
        console.log("event: ", event)
        const key = event.target.name
        const val = event.target.value
        setSearcVal(prev => {
            const copy = { ...prev }
            copy[key] = val
            return copy
        })
    }

    function submitSearchDetails(event) {
        event.preventDefault()
        console.log('submitting')
    }

    function closeFilterForm() {
        toggleFilterForm()
    }

    return <div className="search-container">
        <input
            type="text"
            className="search"
            name="filter"
            id="filter"
            placeholder="Search mail"
            onInput={onSearch}
        />
        <img src='assets/img/filter.svg' className="filter-icon" onClick={toggleFilterForm} />
        <Modal isOpen={open} onClose={closeFilterForm}>
            <span>Filtering options</span>
            <form onSubmit={(event) => submitSearchDetails(event)} className='form flex column align-center justify-center'>
                <input className="input" type="text" name="subject" id="subject" onInput={onInput} placeholder="Subject" defaultValue={''} />
                <input className="input" type="text" name="body" id="body" onInput={onInput} placeholder="Body" defaultValue={''} />
                <div
                    className="flex row align-center"
                    style={{
                        width: '100%',
                        justifyContent: 'flex-end',
                    }}
                >
                    <input
                        className="span-margin"
                        type="submit"
                        value="Search"
                        style={{
                            backgroundColor: 'rgb(26, 115, 232)',
                            border: 'none',
                            borderRadius: '10px',
                            color: 'white',
                            padding: '10px',
                            marginTop: '25px'
                        }}
                    />
                </div>
            </form>
        </Modal>
    </div>
}