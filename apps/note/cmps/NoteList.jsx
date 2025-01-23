import { NotePreview } from "../cmps/NotePreview.jsx"

export function NoteList({ notes, handleOnRemoveNote, handleOnTogglePin }) {


    if (!notes) return <div>No Notes to show</div>

    return (
        <ul className="note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview
                        note={note}
                        handleOnRemoveNote={() => { handleOnRemoveNote(note.id) }}
                        handleOnTogglePin={() => { handleOnTogglePin(note.id) }} />
                </li>
            ))}
        </ul>
    )
}
