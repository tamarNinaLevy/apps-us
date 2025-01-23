import { NotePreview } from "../cmps/NotePreview.jsx"
const { Fragment } = React

export function NoteList({ notes, handleOnRemoveNote, handleOnTogglePin }) {

    const pinnedNotes = notes.filter(note => note.isPinned)
    const unPinnedNotes = notes.filter(note => !note.isPinned)

    if (!notes) return <div>No Notes to show</div>

    return (
        <Fragment>
            <ul className="note-list">
                {pinnedNotes.map(note => (
                    <li key={note.id}>
                        <NotePreview
                            note={note}
                            handleOnRemoveNote={() => { handleOnRemoveNote(note.id) }}
                            handleOnTogglePin={() => { handleOnTogglePin(note.id) }} />
                    </li>
                ))}
            </ul>
            <ul className="note-list">
                {unPinnedNotes.map(note => (
                    <li key={note.id}>
                        <NotePreview
                            note={note}
                            handleOnRemoveNote={() => { handleOnRemoveNote(note.id) }}
                            handleOnTogglePin={() => { handleOnTogglePin(note.id) }} />
                    </li>
                ))}
            </ul>
        </Fragment>
    )
}
