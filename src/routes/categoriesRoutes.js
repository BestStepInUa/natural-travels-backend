import { Router } from 'express';
import { getCategories } from '../controllers/categoriesControllers.js';

const categoriesRouter = Router();
categoriesRouter.get('/api/categories', getCategories);

export default categoriesRouter;
