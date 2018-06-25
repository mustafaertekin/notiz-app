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
                method: 'POST',
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
                method: 'PUT',
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