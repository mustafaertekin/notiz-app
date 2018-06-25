/*
NotesStorage.js: Modul, welches alle Funktionalitäten beinhaltet, 
welche benötigt werden um die Notes zu verwalten z.B. folgende Funktionen:
- GetNotes(orderBy, filterBy)
- AddNote(note)
- UpdateNote(note)
- GetNoteById(id) 
! Wichtig: Der Store darf kein Zugriff auf den DOM haben.
! Hinweis: Dieses Modul ist das M von MVC 
*/

class Note {
    constructor (id, title, desc, createdDate, dueDate, priority, checkedFinished, isFinished) {
        this._id = id;
        this.title = title;
        this.desc = desc;
        this.createdDate = createdDate;
        this.dueDate = dueDate;
        this.priority = priority;
        this.checkedFinished = checkedFinished;
        this.isFinished = isFinished;
    }

    identifier(){
        return this._id;
    }
}

let notesStorage = [];

const myLocalStorage = new commons.LocalStorageService();      // -> shared.js

function NotesStorage () {
    this.GetNotes = (orderBy, filterBy) => {
        return findAll()
            .then(notes => {
                notesStorage = notes.data;
                return notesStorage
                        .filter(item => filterBy ? item[filterBy] == true: true)
                        .sort((a,b) => a[orderBy] < b[orderBy]);
            });
    }

    this.AddNote = (note) => {
        return create(note);
    }

    this.UpdateNote = (note) => {
        return update(note);
    }

    this.GetNoteById = (id) => {
        return findById(id);
    }

    this.deleteNoteById = (id) => {
        return remove(id);
        /*let notes = myLocalStorage.getItem('notes');
        notes = notes.filter(item => item.id != id);
        myLocalStorage.setItem("notes", notes);*/
    }
}

