var express = require('express');
var router = express.Router();
const noteController = require('../controllers/noteController');

router.get('/notes', noteController.findAll);
router.get('/notes/:id', noteController.find);
router.delete('/notes/:id', noteController.deleteNote);
router.put('/notes/:id', noteController.update);
router.post('/notes', noteController.add);

module.exports = router;
