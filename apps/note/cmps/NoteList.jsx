import { NotePreview } from "../cmps/NotePreview.jsx"


export function NoteList({ notes }) {

    if (!notes) return <div>No Notes to show</div>
    return (
        <ul className="note-list">
            {notes.map(note => (
                <li key={note.id}>
                    <NotePreview
                        note={note} />
                </li>
            ))}
        </ul>
    )
}
