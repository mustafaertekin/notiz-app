(function ($, noteService, storage, templateUtils) {

    let toggleShowFinished = false;

    const showFinished = $('#showFinished');
    const sortByFinishedDate = $('#sortByFinishedDate');
    const sortByCreatedDate = $('#sortByCreatedDate');
    const sortByPriority = $('#sortByPriority');


    function init(){
        let orderBy = storage.get("orderBy");
        noteService.setOrderBy(orderBy).getAllNotes().then(templateUtils.render);
    }

    sortByFinishedDate.on('click', () => {
        noteService.setOrderBy('dueDate')
            .getAllNotes()
            .then((list) => templateUtils.render(list, "dueDate"));
        storage.add("orderBy", "dueDate");
    });

    sortByCreatedDate.on('click', () => {
        noteService.setOrderBy('createdDate')
            .getAllNotes()
            .then((list) => templateUtils.render(list, "createdDate"));
        storage.add("orderBy", "createdDate");
    });

    sortByPriority.on('click', () => {
        noteService.setOrderBy('priority')
            .getAllNotes()
            .then((list) => templateUtils.render(list, "priority"));
        storage.add("orderBy", "priority");
    });

    showFinished.on('click', () => {
        toggleShowFinished = !toggleShowFinished;
        let filterBy = toggleShowFinished ? 'isFinished' : '';
        noteService.setFilterBy(filterBy).getAllNotes().then(templateUtils.render);
    });



    init();
}(jQuery, services.noteService, services.storage, templates.util));