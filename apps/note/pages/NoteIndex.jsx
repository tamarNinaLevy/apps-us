import { NoteAdd } from "../cmps/NoteAdd.jsx"
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

    function onAddNote() {
        loadNotes()
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId)
    }

    if (!notes) return <div>Loading...</div>
    return (<div>
        <NoteAdd handleOnAddNote={onAddNote} />
        <section className="note-index">
            <NoteList
                notes={notes} />
        </section>
    </div>
    )
}
