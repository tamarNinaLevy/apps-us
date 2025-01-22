import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)

    }

    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <NoteList
                notes={notes} />

        </section>
    )
}
