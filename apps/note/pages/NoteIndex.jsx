import { Modal } from '../../../cmps/Modal.jsx'
import { NoteEdit } from "../cmps/NoteEdit.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [currentEditedNote, setCurrentEditedNote] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)

    }

    function onAddNote() {
        loadNotes()
        setCurrentEditedNote(null)
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

    function onToggleTodo(noteId) {
        let note = notes.find(note => note.id === noteId)
        note = { ...note }
        noteService.save(note)
            .then(() => {
                loadNotes()
            })
    }

    function onNoteClicked(noteId) {
        let note = notes.find(note => note.id === noteId)
        setCurrentEditedNote(note)
    }

    if (!notes) return <div>Loading...</div>
    return (<div className="note-index">
        <section>
            <div className="note-add">
                <NoteEdit handleSaveNote={onAddNote} />
            </div>

            <h3>PINNED</h3>
            <NoteList
                notes={notes.filter(note => note.isPinned)}
                handleOnRemoveNote={onRemoveNote}
                handleOnTogglePin={onTogglePin}
                handleOnToggleTodo={onToggleTodo}
                handleOnNoteClicked={onNoteClicked} />
            <h3>OTHERS</h3>
            <NoteList
                notes={notes.filter(note => !note.isPinned)
                }
                handleOnRemoveNote={onRemoveNote}
                handleOnTogglePin={onTogglePin}
                handleOnToggleTodo={onToggleTodo}
                handleOnNoteClicked={onNoteClicked} />

        </section>
        {currentEditedNote && <Modal isOpen={!!currentEditedNote} onClose={() => { setCurrentEditedNote(null) }} >
            <div className="note-add">
                <NoteEdit
                    note={currentEditedNote}
                    handleSaveNote={onAddNote}
                />
            </div>
        </Modal>}

    </div>
    )
}
