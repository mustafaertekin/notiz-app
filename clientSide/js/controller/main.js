
    const storage = new NotesStorage();
    const helper = new handleBarHelper();
    const showFinished = $('#showFinished');
    const deleteBtn = $('.deleteBtn');
    const sortByFinishedDate = $('#sortByFinishedDate');
    const sortByCreatedDate = $('#sortByCreatedDate');
    const sortByPriority = $('#sortByPriority');
    const isFinishedCheckbox = $(".is-finished");
    const saveNote = $('#btnSaveNote');
    let toogleShowFinished = false;

    sortByCreatedDate.on('click', () =>{
        helper.setOrderBy('due');
        helper.renderTodos();
    });

    sortByFinishedDate.on('click', () =>{
        helper.setOrderBy('dueDate');
        helper.renderTodos();
    });
    sortByPriority.on('click', () =>{
        helper.setOrderBy('priority');
        helper.renderTodos();
    });

    showFinished.on('click', () =>{
        toogleShowFinished = !toogleShowFinished;
        if(toogleShowFinished) {
            helper.setFilterBy('isFinished');
        } else{
            helper.setFilterBy();
        }
        helper.renderTodos();
    });

    saveNote.on('click', () =>{
        saveAllDetails()
            .then( () => helper.renderTodos())
            .catch( () => console.log("error"))
    });

    document.getElementById("content").addEventListener("click", (e) => {
        if( e.target.classList.contains("deleteBtn")) {
            storage
                .deleteNoteById(e.target.dataset.id)
                .then(helper.renderTodos);
        }
        if( e.target.classList.contains("is-finished")) {
            const isChecked = $(e.target).is(":checked");
            storage.GetNoteById(e.target.dataset.id)
                .then((response) => {
                    const selected = response.data;
                    selected.isFinished = isChecked;
                    console.log(selected);
                    selected.checkedFinished = new Date();
                    storage
                        .UpdateNote(selected)
                        .then(helper.renderTodos)
                });

        }
    })
    
    helper.renderTodos();