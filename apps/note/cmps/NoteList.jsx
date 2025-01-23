import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, handleOnRemoveNote, handleOnTogglePin, handleOnToggleTodo, handleOnNoteClicked }) {


    if (!notes) return <div>No Notes to show</div>

    return (
        <ul className="note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview
                        note={note}
                        handleOnRemoveNote={() => { handleOnRemoveNote(note.id) }}
                        handleOnTogglePin={() => { handleOnTogglePin(note.id) }}
                        handleOnToggleTodo={() => { handleOnToggleTodo(note.id) }}
                        handleOnClickNote={() => { handleOnNoteClicked(note.id) }} />
                </li>
            ))}
        </ul>
    )
}
