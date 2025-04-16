import express from 'express';
import cors from 'cors';
import mealRoutes from './routes/meals.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/meals', mealRoutes);

export default app;
