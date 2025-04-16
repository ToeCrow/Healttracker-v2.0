import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Meal = sequelize.define('Meal', {
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  mealType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  kcal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Meal;
