import { noteService } from "../services/note.service.js";
const { useState, useRef, useEffect } = React

export function NoteAdd({ handleOnAddNote }) {
    const [newNote, setNewNote] = useState(() => noteService.getEmptyNote());
    const [selectedType, setSelectedType] = useState('NoteTxt'); // Default to text note
    const [isOpen, setIsOpen] = useState(false)
    const cmpRef = useRef(null)

    const handleChange = ({ target }) => {
        const field = target.name;
        let value;

        // Handle different input types
        if (target.type === 'checkbox') {
            value = target.checked; // For checkboxes
        } else if (target.type === 'number' || target.type === 'range') {
            value = +target.value; // Convert number inputs
        } else {
            value = target.value; // Default case
        }

        setNewNote((prevNote) => {
            const updatedNote = { ...prevNote };

            if (field.includes('.')) {
                // Handle nested fields (e.g., 'style.backgroundColor')
                const keys = field.split('.');
                let nestedObj = updatedNote;

                // Traverse to the last key in the path
                keys.slice(0, -1).forEach((key) => {
                    if (!nestedObj[key]) nestedObj[key] = {}; // Ensure the path exists
                    nestedObj = nestedObj[key];
                });

                // Update the final key with the new value
                nestedObj[keys[keys.length - 1]] = value;
            } else {
                // Handle top-level fields
                updatedNote.info[field] = value;
            }

            return updatedNote;
        });
    }

    const handleTypeChange = (event) => {
        const type = event.target.value
        setSelectedType(type)

        const emptyNote = noteService.getEmptyNote(type)
        setNewNote(emptyNote)
    }

    const handleAddNote = (event) => {
        event.preventDefault()
        noteService.save(newNote).then(() => {
            setNewNote(noteService.getEmptyNote(selectedType))
            handleOnAddNote()
            setIsOpen(false)
        })
    }
    const handleClickOutside = (event) => {
        console.log(cmpRef.current)
        if (cmpRef.current && !cmpRef.current.contains(event.target)) {
            setIsOpen(false)
            if (newNote.info.txt) {
                handleAddNote(event)
            }
        }
    }

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('click', handleClickOutside)
        } else {
            window.removeEventListener('click', handleClickOutside)
        }
        return () => {
            window.removeEventListener('click', handleClickOutside)
        }
    }, [isOpen])

    // return (
    //     <div ref={cmpRef} className="note-add">
    //         <form onSubmit={handleAddNote}>
    //             {isOpen &&
    //                 <div>
    //                     <select value={selectedType} onChange={handleTypeChange}>
    //                         <option value="NoteTxt">Text Note</option>
    //                         <option value="NoteImg">Image Note</option>
    //                         <option value="NoteVideo">Video Note</option>
    //                         <option value="NoteTodos">Todos Note</option>
    //                     </select>

    //                     <input
    //                         type="color"
    //                         name="style.backgroundColor"
    //                         value={newNote.style.backgroundColor || '#FFFF00'} // Default to yellow
    //                         onChange={handleChange}
    //                     />
    //                 </div>
    //             }
    //             <input onClick={() => { setIsOpen(true) }}
    //                 required
    //                 type="text"
    //                 name="txt"
    //                 placeholder="Add a text note..."
    //                 value={newNote.info.txt || ''}
    //                 onChange={handleChange}
    //             />

    //             {selectedType === 'NoteImg' && (
    //                 <input
    //                     required
    //                     type="text"
    //                     name="url"
    //                     placeholder="Enter image URL..."
    //                     value={newNote.info.url || ''}
    //                     onChange={handleChange}
    //                 />
    //             )}

    //             {selectedType === 'NoteVideo' && (
    //                 <input
    //                     required
    //                     type="text"
    //                     name="url"
    //                     placeholder="Enter video URL..."
    //                     value={newNote.info.url || ''}
    //                     onChange={handleChange}
    //                 />
    //             )}

    //             {selectedType === 'NoteTodos' && (
    //                 <textarea
    //                     required
    //                     name="todos"
    //                     placeholder="Enter todos (comma-separated)..."
    //                     value={(newNote.info.todos && newNote.info.todos.map((todo) => todo.txt).join(', ')) || ''}
    //                     onChange={(e) => {
    //                         const todos = e.target.value.split(',').map((txt) => ({ txt: txt.trim(), doneAt: null }))
    //                         setNewNote((prevNote) => ({
    //                             ...prevNote,
    //                             info: { ...prevNote.info, todos },
    //                         }));
    //                     }}
    //                 />
    //             )}
    //         </form>
    //     </div>
    // )

    return (
        <div ref={cmpRef} className="note-add">
            <form onSubmit={handleAddNote}>
                {isOpen &&
                    <input type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleChange}
                        value={newNote.info.title || ''} />
                }
                <input onClick={() => { setIsOpen(true) }}
                    required
                    type="text"
                    name="txt"
                    placeholder="Take a note..."
                    value={newNote.info.txt || ''}
                    onChange={handleChange}
                />
                {isOpen &&
                    <div className="actions">
                        actions
                    </div>}
            </form>
        </div>


    )
}
