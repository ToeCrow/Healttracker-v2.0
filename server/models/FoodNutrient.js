import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const FoodNutrient = sequelize.define('FoodNutrient', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  namn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  naringsvarde_namn: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  varde: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  enhet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  viktGram: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  livsmedel_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default FoodNutrient;
