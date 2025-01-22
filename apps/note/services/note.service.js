// note service
import { storageService } from '../../../services/async-storage.service.js'
import { loadFromStorage, saveToStorage } from '../../../services/util.service.js'
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
            {
                id: 'n101',
                createdAt: 1112222,
                type: 'NoteTxt',
                isPinned: true,
                style: {
                    backgroundColor: '#00d'
                },
                info: {
                    txt: 'Fullstack Me Baby!'
                }
            },
            {
                id: 'n102',
                createdAt: 1112223,
                type: 'NoteImg',
                isPinned: false,
                info: {
                    url: 'http://some-img/me',
                    title: 'Bobi and Me'
                },
                style: {
                    backgroundColor: '#00d'
                }
            },
            {
                id: 'n103',
                createdAt: 1112224,
                type: 'NoteTodos',
                isPinned: false,
                info: {
                    title: 'Get my stuff together',
                    todos: [
                        { txt: 'Driving license', doneAt: null },
                        { txt: 'Coding power', doneAt: 187111111 }
                    ]
                }
            }
        ]
        saveToStorage(NOTE_KEY, notes)
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
