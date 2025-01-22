import { noteService } from "../services/note.service.js";
const { useState } = React

export function NoteAdd({ handleOnAddNote }) {
    const [newNote, setNewNote] = useState(() => noteService.getEmptyNote());
    const [selectedType, setSelectedType] = useState('NoteTxt'); // Default to text note

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewNote((prevNote) => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value,
            },
        }))
    }

    const handleTypeChange = (event) => {
        const type = event.target.value
        setSelectedType(type)

        const emptyNote = noteService.getEmptyNote(type);
        setNewNote(emptyNote)
    }

    const handleAddNote = (e) => {
        e.preventDefault()
        noteService.save(newNote).then(() => {
            setNewNote(noteService.getEmptyNote(selectedType));
            handleOnAddNote()
        })
    }


    return (
        <div className="note-add">
            <form onSubmit={handleAddNote}>
                <select value={selectedType} onChange={handleTypeChange}>
                    <option value="NoteTxt">Text Note</option>
                    <option value="NoteImg">Image Note</option>
                    <option value="NoteVideo">Video Note</option>
                    <option value="NoteTodos">Todos Note</option>
                </select>

                {/* Dynamic Input Rendering */}
                {selectedType === 'NoteTxt' && (
                    <input
                        required
                        type="text"
                        name="txt"
                        placeholder="Add a text note..."
                        value={newNote.info.txt || ''}
                        onChange={handleChange}
                    />
                )}

                {selectedType === 'NoteImg' && (
                    <input
                        required
                        type="text"
                        name="url"
                        placeholder="Enter image URL..."
                        value={newNote.info.url || ''}
                        onChange={handleChange}
                    />
                )}

                {selectedType === 'NoteVideo' && (
                    <input
                        required
                        type="text"
                        name="url"
                        placeholder="Enter video URL..."
                        value={newNote.info.url || ''}
                        onChange={handleChange}
                    />
                )}

                {selectedType === 'NoteTodos' && (
                    <textarea
                        required
                        name="todos"
                        placeholder="Enter todos (comma-separated)..."
                        value={(newNote.info.todos && newNote.info.todos.map((todo) => todo.txt).join(', ')) || ''}
                        onChange={(e) => {
                            const todos = e.target.value.split(',').map((txt) => ({ txt: txt.trim(), doneAt: null }))
                            setNewNote((prevNote) => ({
                                ...prevNote,
                                info: { ...prevNote.info, todos },
                            }))
                        }}
                    />

                )}

                <button >Add Note</button>
            </form>
        </div>
    )
}
