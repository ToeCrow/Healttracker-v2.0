import express from 'express';
import cors from 'cors';
import mealRoutes from './routes/meals.js';
import foodRoutes from './routes/food.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/meals', mealRoutes);
app.use('/api/food', foodRoutes); 

export default app;
