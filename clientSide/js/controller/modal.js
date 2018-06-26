// Get the modal
var modalNewNote = document.getElementById('newNoteModal');

// Get the button that opens the modal
var btnNew = document.getElementById("newNoteBtn");
var btnEdit = document.getElementsByClassName("editBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btnNew.onclick = function() {
    editNoteController.resetModalFields ();
    $('#newNoteModal').show();
    $('#newNoteModal > div > header > h3').html('New Note')
}

// When the user clicks the edit button, open the modal for edit
/*btnEdit.onclick = function() {
    modalNewNote.style.display = "block";
}*/
$('#container').on('click', '.editBtn', function (e) {
    $('#newNoteModal').show();
    $('#newNoteModal > div > header > h3').html('Edit note')
    let myid = $(e.target).data('id');
    editNoteController.putDetailsToModal(myid);
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modalNewNote) {
        modalNewNote.style.display = "none";
    }
}

