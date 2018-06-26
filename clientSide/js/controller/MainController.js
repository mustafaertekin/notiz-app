let mainController =
    (function ($, NoteService, storage, templateUtils) {

        let orderBy = 'priority';
        let filterBy = '';

        const showFinished = $('#showFinished');
        const deleteBtn = $('.deleteBtn');
        const sortByFinishedDate = $('#sortByFinishedDate');
        const sortByCreatedDate = $('#sortByCreatedDate');
        const sortByPriority = $('#sortByPriority');
        const isFinishedCheckbox = $(".is-finished");
        const saveNote = $('#btnSaveNote');

        let toogleShowFinished = false;

        function renderNotes() {
            NoteService.getAllNotes(orderBy, filterBy).then(templateUtils.renderTodos);
        }

        sortByCreatedDate.on('click', () => {
            orderBy = 'due';
            renderNotes();
        });

        sortByFinishedDate.on('click', () => {
            orderBy = 'dueDate';
            renderNotes();
        });

        sortByPriority.on('click', () => {
            orderBy = 'priority';
            renderNotes();
        });

        showFinished.on('click', () => {
            toogleShowFinished = !toogleShowFinished;
            filterBy = toogleShowFinished ? 'isFinished' : '';
            renderNotes();
        });

        // TODO: remove it!
        saveNote.on('click', () => {
            editNoteController.saveAllDetails()
                .then(renderNotes)
                .catch(console.error)
        });

        $("#content")
            .on("click", ".deleteBtn", () => {
                NoteService
                    .deleteNoteById(+$(this).data("id"))
                    .then(renderNotes);
            })
            .on("click", ".is-finished", () => {
                const isChecked = $(this).is(":checked");
                NoteService
                    .getNoteById(+$(this).data("id"))
                    .then((response) => {
                        const selected = response.data;
                        selected.isFinished = isChecked;
                        selected.checkedFinished = new Date();
                        NoteService
                            .updateNote(selected)
                            .then(renderNotes)
                    });
            });


        // this function is initially called to render the existing notes
        renderNotes();

    }(jQuery, services.NoteService, services.storage, templates.util));