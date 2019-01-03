const express = require('express');
const router = express.Router();
const movieController = require('../app/api/controllers/movies');

router.get('/', movieController.getAll);


module.exports = router;