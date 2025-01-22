export function NoteImg({ info }) {
    return (
        <div className="note-img">
            <h4>{info.title}</h4>
            <img src={info.url} alt={info.title} />
        </div>
    )
}
