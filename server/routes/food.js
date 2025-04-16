import express from 'express';
import { getFoodNutrients } from '../controllers/foodController.js';

const router = express.Router();

// Hämta näringsvärden för ett livsmedel
router.get('/:foodId/nutrients', getFoodNutrients);

export default router;
