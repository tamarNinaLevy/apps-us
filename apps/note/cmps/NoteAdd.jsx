import { noteService } from "../services/note.service.js"
const { useState, useEffect } = React

export function NoteAdd({ handleOnAddNote }) {
    const [newNote, setNewNote] = useState(() => noteService.getEmptyNote());

    const handleChange = (event) => {
        const { name, value } = event.target
        setNewNote((prevNote) => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value,
            },
        }))
    }

    const handleAddNote = () => {
        if (!newNote.info.txt.trim()) return
        noteService.save(newNote).then(() => {
            setNewNote(noteService.getEmptyNote())
            handleOnAddNote()
        })
    }

    return (
        <div className="note-add">
            <input
                type="text"
                name="txt"
                placeholder="Add a note..."
                value={newNote.info.txt || ''}
                onChange={handleChange}
            />
            <button onClick={handleAddNote}>Add Note</button>
        </div>
    )
}
