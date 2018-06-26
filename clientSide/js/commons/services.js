let services =
    ( function() {
        let restUrl = 'http://localhost:8000/notes';

        class HttpService
        {
            static async findAll() {
                let response = await fetch(restUrl);
                return await response.json();
            }

            static async findById(id) {
                let response = await fetch(`${restUrl}/${id}`);
                return await response.json();
            }

            static async create(data) {
                return await fetch(restUrl, {
                    body: JSON.stringify(data),
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(response => response.json()) // parses response to JSON
            }

            static async update(data) {
                return await fetch(`${restUrl}/${data._id}`, {
                    body: JSON.stringify(data), // must match 'Content-Type' header
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                    .then(response => response.json()) // parses response to JSON
            }

            static async remove(id) {
                return await fetch("http://localhost:8000/notes/" + id, {
                    method: 'DELETE'
                })
                    .then(response => response.json());
            }
        }

        return {
            HttpService
        }
    }());