import { createSlice } from "@reduxjs/toolkit";
import { getTodayISO, addDays } from "../../utils/date";



const mealSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
    currentDate: getTodayISO(),
  },
  reducers: {
    setDate: (state, action) => {
      state.currentDate = action.payload;
    },

    nextDay: (state) => {
      state.currentDate = addDays(state.currentDate, 1);
    },
    prevDay: (state) => {
      state.currentDate = addDays(state.currentDate, -1);
    },
    
    addMeal: (state, action) => {
      const { date, mealType, foods, total } = action.payload;
    
      const existingIndex = state.meals.findIndex(
        (meal) => meal.date === date && meal.mealType === mealType
      );
    
      if (existingIndex !== -1) {
        const existingMeal = state.meals[existingIndex];
    
        // Lägg till nya foods
        const updatedFoods = [...existingMeal.foods, ...foods];
    
        // Summera totals
        const updatedTotal = {
          protein: Number(existingMeal.total.protein) + Number(total.protein),
          kolhydrater: Number(existingMeal.total.kolhydrater) + Number(total.kolhydrater),
          fett: Number(existingMeal.total.fett) + Number(total.fett),
          kcal: Number(existingMeal.total.kcal) + Number(total.kcal),
        };
    
        state.meals[existingIndex] = {
          ...existingMeal,
          foods: updatedFoods,
          total: updatedTotal,
        };
      } else {
        state.meals.push(action.payload);
      }
    },
    
    
    updateMeal: (state, action) => {
      const index = state.meals.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.meals[index] = action.payload;
      }
    },

    // Ny reducer för att ta bort ett livsmedel från en måltid
    removeFood: (state, action) => {
      const { mealId, foodIndex } = action.payload;
      const mealIndex = state.meals.findIndex(m => m.id === mealId);
    
      if (mealIndex !== -1) {
        const meal = state.meals[mealIndex];
        const updatedFoods = [...meal.foods];
        updatedFoods.splice(foodIndex, 1); // Ta bort objektet vid det angivna indexet

        // Summera totals på nytt efter att ha tagit bort ett livsmedel
        const updatedTotal = updatedFoods.reduce(
          (acc, food) => {
            acc.protein += food.totalProtein;
            acc.kolhydrater += food.totalKolhydrater;
            acc.fett += food.totalFett;
            acc.kcal += food.totalKcal;
            return acc;
          },
          { protein: 0, kolhydrater: 0, fett: 0, kcal: 0 }
        );
    
        state.meals[mealIndex] = {
          ...meal,
          foods: updatedFoods,
          total: updatedTotal,
        };
      }
    },

    getMealsByDate: (state, action) => {
      return state.meals.filter(m => m.date === action.payload.date);
    }
  },
});


export const { setDate, nextDay, prevDay, addMeal, removeFood, updateMeal, getMealsByDate } = mealSlice.actions;
export default mealSlice.reducer;
