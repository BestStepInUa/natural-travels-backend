import { Router } from 'express';
import { getStories } from '../controllers/storiesController.ts';

const router = Router();

router.get('/stories', getStories);

export default router;
