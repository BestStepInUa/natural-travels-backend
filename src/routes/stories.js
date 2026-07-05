const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/storiesController');

router.get('/:id', ctrl.getStoryById);

module.exports = router;
