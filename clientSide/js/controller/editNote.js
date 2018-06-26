let editNoteController =
    ( function() {
        function putDetailsToModal(id) {
            findById(id).then(noteData => {
                let note = noteData.data;
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

            return storage
                .GetNoteById(id)
                .then(noteData => {
                    let note = noteData.data;

                    // to use the same modal-page for both new-note and edit-note
                    // first line: takes the existing note by id if it has an id
                    // second line: if id is not null, creates new Note form the class
                    return note ? new Note(id, title, desc, note.createdDate, dueDate, priority, note.checkedFinished, note.isFinished)
                        : new Note(null, title, desc, new Date(), dueDate, priority, null, false);
                })
                // note.identifier requests the id
                // then -> if id is not null -> PUT by ID
                //      -> if it is null -> POST (ID will be given by database)
                .then(note => note.identifier() ? storage.UpdateNote(note) : storage.AddNote(note));
        }

        return {
            putDetailsToModal,
            resetModalFields,
            saveAllDetails,
            storage
        };
    }) ();

