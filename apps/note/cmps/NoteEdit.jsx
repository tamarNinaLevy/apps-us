import { noteService } from "../services/note.service.js"

const { useState, useRef, useEffect } = React


export function NoteEdit({ note = noteService.getEmptyNote(), handleSaveNote }) {
    const [noteToEdit, setNoteToEdit] = useState(note)
    const [isOpen, setIsOpen] = useState(false)
    const [textareaRows, setTextareaRows] = useState(noteToEdit.info.txt ? noteToEdit.info.txt.split("\n").length : 1)
    const cmpRef = useRef(null)


    const handleChange = ({ target }) => {
        const field = target.name;
        let value = target.value;

        setNoteToEdit((prevNote) => {
            const updatedNote = { ...prevNote };

            if (field === 'txt') {
                const newLineCount = value.split("\n").length;
                setTextareaRows(newLineCount);
            }

            if (field === "todos") {
                // Update todos as a single text string to allow backspace and space
                updatedNote.info.todosText = value; // Temporarily store the raw string input

                // Convert the string into an array of todo objects when saving or updating
                updatedNote.info.todos = value.split(",").map((txt) => ({ txt: txt.trim() }));
            } else if (field.includes(".")) {
                // Handle nested fields (e.g., 'style.backgroundColor')
                const keys = field.split(".");
                let nestedObj = updatedNote;

                keys.slice(0, -1).forEach((key) => {
                    if (!nestedObj[key]) nestedObj[key] = {};
                    nestedObj = nestedObj[key];
                });

                nestedObj[keys[keys.length - 1]] = value;
            } else {
                updatedNote.info[field] = value;
            }

            return updatedNote;
        });
    }

    const onSaveNote = (event) => {
        event.preventDefault()

        if (noteToEdit.type === 'NoteTxt' && !noteToEdit.info.txt || noteToEdit.type === 'NoteTodos' && noteToEdit.info.todos.length === 0) {
            setEmptyNote()
            setIsOpen(false)
            return
        }
        noteService.save(noteToEdit).then(() => {
            if (!noteToEdit.id) {
                setNoteToEdit(noteService.getEmptyNote())
            }
            handleSaveNote(noteToEdit)
            setIsOpen(false)
            setTextareaRows(1)
        })


    }

    const handleKeyDown = (event) => {
        const { key, metaKey, ctrlKey } = event
        if (key === 'Enter') {
            if ((ctrlKey || metaKey)) {
                onSaveNote(event)
                return
            }
            // setTextareaRows(prevRows => ++prevRows)
        }
    }

    const handleTypeChange = (type) => {
        setEmptyNote(type)
        setIsOpen(true)
    }


    const setEmptyNote = (type = "NoteTxt") => {
        const emptyNote = noteService.getEmptyNote(type)
        setNoteToEdit(emptyNote)
        setTextareaRows(1)
    }

    const handleClickOutside = (event) => {
        if (cmpRef.current && !cmpRef.current.contains(event.target)) {
            onSaveNote(event)
        }
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("click", handleClickOutside);
        } else {
            window.removeEventListener("click", handleClickOutside);
        }
        return () => {
            window.removeEventListener("click", handleClickOutside);
        }
    }, [isOpen])

    useEffect(() => {
        if (note.id !== noteToEdit.id)
            setNoteToEdit(note)
    }, [note])

    return (
        <form ref={cmpRef} onSubmit={onSaveNote}  >
            {isOpen && (
                <input
                    onKeyDown={handleKeyDown}
                    type="text"
                    name="title"
                    placeholder="Title"
                    onChange={handleChange}
                    value={noteToEdit.info.title || ""}
                />
            )}
            <div className={`floating-actions ${isOpen ? 'hidden' : ''}`}>
                <button
                    type="button"
                    className={`type-btn ${noteToEdit.type === "NoteTodos" ? "active" : ""}`}
                    onClick={() => handleTypeChange("NoteTodos")}
                >
                    <span className="material-symbols-outlined">
                        check_box
                    </span>
                </button>
            </div>
            <textarea
                onKeyDown={handleKeyDown}
                rows={textareaRows}
                onClick={() => setIsOpen(true)}
                name={noteToEdit.type === "NoteTxt" ? "txt" : "todos"}
                placeholder={
                    noteToEdit.type === "NoteTxt"
                        ? "Take a note..."
                        : "Enter items (comma-separated)..."
                }
                value={
                    noteToEdit.type === "NoteTxt"
                        ? noteToEdit.info.txt || ""
                        : noteToEdit.info.todosText || ""
                }
                onChange={handleChange}
            />
            {isOpen && (
                <div className="actions">
                    <input
                        type="color"
                        name="style.backgroundColor"
                        onChange={handleChange}
                        value={noteToEdit.style.backgroundColor || "#ffffff"}
                    />
                </div>
            )}
            <button type="submit" style={{ display: "none" }}></button> {/* Invisible button */}
        </form>
    )
}