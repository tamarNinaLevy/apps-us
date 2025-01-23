export function NoteTxt({ info }) {
    return (
        <div className="note-txt">
            <h3>{info.title || ''}</h3>
            <div className="note-txt">{info.txt}</div>
        </div>
    )
}
