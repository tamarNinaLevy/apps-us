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

export function NotePreview({ note, handleOnRemoveNote }) {
    const formattedType = note.type.charAt(0).toUpperCase() + note.type.slice(1);
    const NoteComponent = dynamicComponents[formattedType]

    if (!NoteComponent) return <div>Unknown Note Type: {note.type}</div>;

    return (
        <div className="note-preview">
            <NoteComponent info={note.info} />
            <button onClick={handleOnRemoveNote}>x</button>
        </div>
    )
}
