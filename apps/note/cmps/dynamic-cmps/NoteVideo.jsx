export function NoteVideo({ info }) {
    return (
        <div className="note-video">
            <video controls>
                <source src={info.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}
