import { noteService } from "../services/note.service.js"
const { useState, useRef, useEffect } = React

export function NoteAdd({ handleOnAddNote }) {
    const [newNote, setNewNote] = useState(() => noteService.getEmptyNote())
    const [selectedType, setSelectedType] = useState(newNote.type)
    const [isOpen, setIsOpen] = useState(false)
    const cmpRef = useRef(null)

    const handleChange = ({ target }) => {
        const field = target.name;
        let value = target.value;

        setNewNote((prevNote) => {
            const updatedNote = { ...prevNote };

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


    const handleTypeChange = (type) => {
        const emptyNote = noteService.getEmptyNote(type)
        setNewNote(emptyNote)
        setSelectedType(type)
    }

    const handleAddNote = (event) => {
        event.preventDefault()
        if (newNote.info.txt || (Array.isArray(newNote.info.todos) && newNote.info.todos.length > 0)) {
            noteService.save(newNote).then(() => {
                setNewNote(noteService.getEmptyNote())
                setIsOpen(false)
                handleOnAddNote()
            })
        }
    }

    const handleClickOutside = (event) => {
        if (cmpRef.current && !cmpRef.current.contains(event.target)) {
            setIsOpen(false)
            handleAddNote(event)

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

    return (
        <div ref={cmpRef} className="note-add">
            <form onSubmit={handleAddNote}>
                {isOpen && (
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={newNote.info.title || ""}
                    />
                )}
                <textarea
                    onClick={() => setIsOpen(true)}
                    name={selectedType === "NoteTxt" ? "txt" : "todos"}
                    placeholder={
                        selectedType === "NoteTxt"
                            ? "Take a note..."
                            : "Enter items (comma-separated)..."
                    }
                    value={
                        selectedType === "NoteTxt"
                            ? newNote.info.txt || ""
                            : newNote.info.todosText || ""
                    }
                    onChange={handleChange}
                />
                {isOpen && (
                    <div className="actions">
                        <button
                            type="button"
                            className={`type-btn ${selectedType === "NoteTxt" ? "active" : ""}`}
                            onClick={() => handleTypeChange("NoteTxt")}
                        >
                            📝
                        </button>
                        <button
                            type="button"
                            className={`type-btn ${selectedType === "NoteTodos" ? "active" : ""}`}
                            onClick={() => handleTypeChange("NoteTodos")}
                        >
                            ✅
                        </button>
                        <input
                            type="color"
                            name="style.backgroundColor"
                            onChange={handleChange}
                            value={newNote.style.backgroundColor || ""}
                        />
                    </div>
                )}
                <button type="submit" style={{ display: "none" }}></button> {/* Invisible button */}
            </form>
        </div>
    )
}
