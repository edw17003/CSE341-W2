const express = require('express');
const router = express.Router();
const controller = require('../controllers');

router.get('/', controller.getAll);

router.get('/:id', controller.getSingle);

module.exports = router;

// const contactsRouter = require('./contacts');
// router.use('/contacts', contactsRouter);

module.exports = router;