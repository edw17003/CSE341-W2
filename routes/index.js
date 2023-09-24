const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

module.exports = router;

module.exports = router;