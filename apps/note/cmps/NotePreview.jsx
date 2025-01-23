import { NoteImg } from './dynamic-cmps/NoteImg.jsx'
import { NoteTodos } from './dynamic-cmps/NoteTodos.jsx'
import { NoteTxt } from './dynamic-cmps/NoteTxt.jsx'
import { NoteVideo } from './dynamic-cmps/NoteVideo.jsx'

const dynamicComponents = {
    NoteTxt,
    NoteImg,
    NoteVideo,
    NoteTodos,
}

export function NotePreview({ note, handleOnRemoveNote, handleOnTogglePin, handleOnToggleTodo, handleOnClickNote }) {
    const NoteComponent = dynamicComponents[note.type]

    if (!NoteComponent) return <div>Unknown Note Type: {note.type}</div>;

    return (
        <div onClick={handleOnClickNote} className="note-preview" style={note.style}>
            <NoteComponent info={note.info} handleOnToggleTodo={handleOnToggleTodo} />
            <button className="remove-btn" onClick={handleOnRemoveNote}>x</button>
            <button className="pin-btn" onClick={handleOnTogglePin}>
                <span className="material-symbols-outlined">
                    keep
                </span>
            </button>
        </div>
    )
}
