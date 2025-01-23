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
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
    }

    function onTogglePin(noteId) {
        let note = notes.find(note => note.id === noteId)
        note.isPinned = !note.isPinned
        note = { ...note }
        noteService.save(note)
            .then(() => {
                loadNotes()
            })
    }

    if (!notes) return <div>Loading...</div>
    return (<div>
        <section className="note-index">
            <NoteAdd handleOnAddNote={onAddNote} />
            <h3>PINNED</h3>
            <NoteList
                notes={notes.filter(note => note.isPinned)}
                handleOnRemoveNote={onRemoveNote}
                handleOnTogglePin={onTogglePin} />
            <h3>OTHERS</h3>
            <NoteList
                notes={notes.filter(note => !note.isPinned)
                }
                handleOnRemoveNote={onRemoveNote}
                handleOnTogglePin={onTogglePin} />

        </section>
    </div>
    )
}
