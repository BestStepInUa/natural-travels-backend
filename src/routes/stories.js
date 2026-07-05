const express = require('express');
const router = express.Router();

const { getStoryById } = require('../controllers/storiesController');

router.get('/:id', getStoryById);

module.exports = router;
