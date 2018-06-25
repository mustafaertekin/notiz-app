/*function findAll () {
    fetch('http://localhost:8000/notes')
    .then(function(response) {
        console.log("ddd", response.json());
        return response.json();
    })
    .then(function(myJson) {
        console.log("Gelmis mi?", myJson);
        return myJson;
    });
}*/

let restUrl = 'http://localhost:8000/notes';


async function findAll () {
    let response = await fetch(restUrl)
    let result = await response.json();
    return result;
}

async function findById (id) {
    let response = await fetch(`${restUrl}/${id}`)
    let result = await response.json();
    return result;
}

function create(data) {
    // Default options are marked with *
    return fetch(restUrl, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(response => response.json()) // parses response to JSON
}

function update(data) {
    // Default options are marked with *
    return fetch(`${restUrl}/${data._id}`, {
                body: JSON.stringify(data), // must match 'Content-Type' header
                method: 'PUT', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(response => response.json()) // parses response to JSON
}



function remove(id) {

    return fetch("http://localhost:8000/notes/" + id, {
                method: 'DELETE'
            })
            .then(response => response.json());
}


/*
$(document).ready(function () { //adds event-listener on button
    $(".js-load-blogposts").on("click", function () {
        findAll();
    });
});
*/

function showNotes(dataToShow) {
    $(".nav").empty();
    console.log(dataToShow);
    dataToShow.data.forEach(function (pNote) {
        var title = pNote.title;
        var body = pNote.desc;

        $(".nav").append(`<h3>${title}</h3><p>${body}</p><hr/>`);
    });
}