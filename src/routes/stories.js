import express from 'express';
import { getStoryById } from '../controllers/storiesController.js';

const router = express.Router();

router.get('/:id', getStoryById);

export default router;
