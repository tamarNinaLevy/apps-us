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

export function NotePreview({ note, handleOnRemoveNote, handleOnTogglePin, handleOnToggleTodo }) {
    const NoteComponent = dynamicComponents[note.type]

    if (!NoteComponent) return <div>Unknown Note Type: {note.type}</div>;

    return (
        <div className="note-preview" style={note.style}>
            <NoteComponent info={note.info} handleOnToggleTodo={handleOnToggleTodo} />
            <button className="remove-btn" onClick={handleOnRemoveNote}>x</button>
            <button className="pin-btn" onClick={handleOnTogglePin}>
                <span class="material-symbols-outlined">
                    keep
                </span>
            </button>
        </div>
    )
}
