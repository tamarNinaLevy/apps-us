// note service
import { storageService } from '../../../services/async-storage.service.js'
import { loadFromStorage, saveToStorage, makeId, makeLorem, getRandomColor, getRandomIntInclusive } from '../../../services/util.service.js'
export const noteService = {
    get,
    query,
    remove,
    save,
    getEmptyNote
}
const NOTE_KEY = 'noteDB'
_createNotes()

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function _createNotes() {
    let notes = loadFromStorage(NOTE_KEY)
    if (!notes || !notes.length) {
        const notes = [
            _createNote({ type: "NoteTxt", isPinned: true }),
            _createNote({ type: "NoteImg", isPinned: false }),
            _createNote({ type: "NoteTodos", isPinned: false }),
            _createNote({ type: "NoteTxt", isPinned: false }),
            _createNote({ type: "NoteImg", isPinned: true }),
            _createNote({ type: "NoteTodos", isPinned: true })]
        saveToStorage(NOTE_KEY, notes)
    }
}

function _createNote({ type, isPinned = false }) {
    const baseNote = {
        id: makeId(),
        createdAt: Date.now(),
        type,
        isPinned,
        style: {
            backgroundColor: getRandomColor(),
        },
    };

    switch (type) {
        case "NoteTxt":
            return {
                ...baseNote,
                info: {
                    txt: makeLorem(20),
                },
            };
        case "NoteImg":
            return {
                ...baseNote,
                info: {
                    url: `https://picsum.photos/200/300?random=${makeId(3)}`,
                    title: makeLorem(3),
                },
            };
        case "NoteTodos":
            return {
                ...baseNote,
                info: {
                    title: makeLorem(5),
                    todos: Array.from({ length: 3 }, () => ({
                        txt: makeLorem(2),
                        doneAt: Math.random() > 0.5 ? Date.now() - getRandomIntInclusive(1, 10) * 86400000 : null,
                    })),
                },
            };
        default:
            return baseNote
    }
}

function getEmptyNote(type = 'NoteTxt') {
    switch (type) {
        case 'NoteTxt':
            return {
                createdAt: Date.now(),
                type: 'NoteTxt',
                isPinned: false,
                style: {
                    backgroundColor: '#FFFF00',
                },
                info: {
                    txt: '',
                },
            };
        case 'NoteTodos':
            return {
                createdAt: Date.now(),
                type: 'NoteTodos',
                isPinned: false,
                style: {
                    backgroundColor: '#FFFF00',
                },
                info: {
                    title: '',
                    todos: [],
                },
            };
        case 'NoteImg':
            return {
                createdAt: Date.now(),
                type: 'NoteImg',
                isPinned: false,
                style: {
                    backgroundColor: '#FFFF00',
                },
                info: {
                    url: '',
                    title: '',
                },
            };
        case 'NoteVideo':
            return {
                createdAt: Date.now(),
                type: 'NoteVideo',
                isPinned: false,
                style: {
                    backgroundColor: '#FFFF00',
                },
                info: {
                    url: '',
                    title: '',
                },
            };
        default:
            throw new Error('Unknown note type');
    }
}
