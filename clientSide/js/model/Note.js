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