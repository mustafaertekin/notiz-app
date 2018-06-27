(function($, noteService, templateUtils) {

    // Modal and modal buttons
    const modalNewNote = $('#newNoteModal');
    const btnNewNote = $("#newNoteBtn");
    const saveNote = $('#btnSaveNote');
    const cancelModal = $('#cancelBtn');

    // When the user clicks the button, the modal is opened
    btnNewNote.on('click', () => {
        $('#newNoteModal').show();
        $('#newNoteModal > div > header > h3').html('New Note');
        resetModalFields();
    });

    saveNote.on('click', () => {
        saveAllDetails()
            .then(noteService.getAllNotes)
            .then(templateUtils.render)
            .catch(console.error)
    });

    // When the user clicks the edit button, it opens the modal for edit
    $('#container').on('click', '.editBtn', function (e) {
        $('#newNoteModal').show();
        $('#newNoteModal > div > header > h3').html('Edit note');
        let id = e.target.dataset.id;
        putDetailsToModal(id);
    });

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target === modalNewNote) {
            modalNewNote.style.display = "none";
        }
    };

    // cancel button on Modal-Page
    cancelModal.on('click', () => {
        resetModalFields();
        $('#newNoteModal').hide();
    });


    $("#content")
        .on("click", ".deleteBtn", (e) => {
            let id = $(e.target).data("id");
            noteService
                .deleteNoteById(id)
                .then(noteService.getAllNotes)
                .then(templateUtils.render);
        })
        .on("click", ".is-finished", (e) => {
            const isChecked = $(e.target).is(":checked");
            noteService
                .getNoteById($(e.target).data("id"))
                .then((response) => {
                    const selected = response;
                    selected.isFinished = isChecked;
                    selected.checkedFinished = new Date();
                    return noteService.updateNote(selected)
                })
        });



    function putDetailsToModal(id) {
        noteService.getNoteById(id).then(noteData => {
            let note = noteData;
            $('#id').val(id);
            $('#title').val(note.title);
            $('#dueDate').val(note.dueDate);
            $('#desc').val(note.desc);
            $('#priority').val(note.priority);
        });
    }

    function resetModalFields() {
        $('#id').val('');
        $('#title').val('');
        $('#dueDate').val('');
        $('#desc').val('');
        $('#priority').val('1');
    }

    function saveAllDetails() {
        let id = $('#id').val();
        let title = $('#title').val();
        let desc = $('#desc').val();
        let dueDate = $('#dueDate').val();
        let priority = $('#priority').val();

        return noteService
                .getNoteById(id)
                .then(noteData => {
                    let note = noteData;
                    // to use the same modal-page for both new-note and edit-note
                    // first line: takes the existing note by id if it has an id
                    // second line: if id is not null, creates new Note form the class
                    return note ? new services.Note(id, title, desc, note.createdDate, dueDate, priority, note.checkedFinished, note.isFinished)
                        : new services.Note(null, title, desc, new Date(), dueDate, priority, null, false);
                })
                // note.identifier requests the id
                // then -> if id is not null -> PUT by ID
                //      -> if it is null -> POST (ID will be given by database)
                .then(note => {
                    return note.identifier() ? noteService.updateNote(note) : noteService.createNote(note);
                })
            .then(() => $('#newNoteModal').hide())
            .then(noteService.getAllNotes)
            .then(templateUtils.render)
            .catch(console.error);

    }

}) (jQuery, services.noteService, templates.util);

