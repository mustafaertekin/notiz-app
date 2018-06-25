const noteService = require('../services/noteService');

const add = (req, res) => {
    noteService.add(req.body, (err, data) => {
        resolver(err, res, data);
    });
}

const update = (req, res) => {
    noteService.update(req.body, (err, data) => {
        resolver(err, res, data);
    });
}

const deleteNote = (req, res) => {
    noteService.deleteNote(req.params.id, (err, data) => {
        resolver(err, res, data);
    });
}

const find = (req, res) => {
    noteService.find(req.params.id, (err, data) => {
        resolver(err, res, data);
    });
}

const findAll = (req, res) => {
    noteService.findAll((err, data) => {
        resolver(err, res, data);
    });
}

const resolver = (err, res, data) => {
    if (err) {
        res.status(500).send({
            error: 'data could not be found!'
        });
    } else {
        res.status(200).send({
            data: data
        });
    }
}

module.exports = {
    add,
    update,
    deleteNote,
    find,
    findAll
}