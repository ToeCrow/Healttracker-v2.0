import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(process.env.PG_URI, {
  dialect: 'postgres',
  logging: false,  // Sätt till true för att logga SQL-frågor för utveckling
});

export default sequelize;
