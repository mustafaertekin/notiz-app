let services =
    (function () {

        /**
         * An abstraction to the local storage standard api
         */
        class LocalStorageService
        {
            add(key, value) {
                value = JSON.stringify(value);
                localStorage.setItem(key, value);
            }

            get(key) {
                let items = localStorage.getItem(key);
                return JSON.parse(items);
            }

            reset() {
                localStorage.clear();
            }
        }


        /**
         * This class is responsible for communicating with rest api
         */
        class HttpService
        {
            constructor(resource = 'http://localhost:8000/notes'){
                this.restUrl = resource;
            }

            async findAll() {
                let response = await fetch(this.restUrl);
                let json = await response.json();
                return json.data;
            }

            async findById(id) {
                let response = await fetch(`${this.restUrl}/${id}`);
                let json = await response.json();
                return json.data;
            }

            async create(data) {
                return await fetch(this.restUrl, {
                    body: JSON.stringify(data),
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(json => json.data);
            }

            async update(data) {
                return await fetch(`${this.restUrl}/${data._id}`, {
                    body: JSON.stringify(data), // must match 'Content-Type' header
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(json => json.data);
            }

            async remove(id) {
                return await fetch(`${this.restUrl}/${id}`, {
                    method: 'DELETE'
                })
                .then(response => response.json())
                .then(json => json.data);
            }
        }

        /**
         * The main element of the entire application
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

        /**
         * This service is responsible for "note" creation
         */
        class NoteService{

            constructor(){
                this.orderBy = 'priority';
                this.filterBy = '';
            }

            setOrderBy(orderBy = 'priority'){
                this.orderBy = orderBy;
                return this;
            }

            setFilterBy(filterBy){
                this.filterBy = filterBy;
                return this;
            }

            emptyNote(){
                return new Note();
            }

            convertToNote(nt){
                return new Note(nt.id, nt.title, nt.desc, nt.createdDate, nt.dueDate, nt.priority, nt.checkedFinished, nt.isFinished);
            }


            async getAllNotes(){
                let list = await http.findAll();
                return list.filter(item => this.filterBy ? item[this.filterBy] === true: true)
                           .sort((a, b) => a[this.orderBy] < b[this.orderBy]);
            }

            async createNote(note){
                return await http.create(note);
            }

            async getNoteById(id){
                return await http.findById(id);
            }

            async deleteNoteById(id){
                return await http.remove(id)
            }

            async updateNote(note){
                return await http.update(note);
            }
        }


        const http = new HttpService('http://localhost:8000/notes');

        return {
            storage: new LocalStorageService(),
            noteService: new NoteService(),
            Note: Note

        }
    }());