export function NoteTxt({ info }) {
    return (
        <div className="note-txt-wrapper">
            <h3>{info.title || ''}</h3>
            <p className="note-txt">{info.txt}</p>
        </div>
    )
}
