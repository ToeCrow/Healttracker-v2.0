import { createSlice } from "@reduxjs/toolkit";

const mealSlice = createSlice({
  name: "meals",
  initialState: {
    meals: [],
  },
  reducers: {
    addMeal: (state, action) => {
      state.meals.push(action.payload);
    },
    updateMeal: (state, action) => {
      const index = state.meals.findIndex(m => m.id === action.payload.id);
      if (index !== -1) {
        state.meals[index] = action.payload;
      }
    },
    getMealsByDate: (state, action) => {
      return state.meals.filter(m => m.date === action.payload.date);
    }
  },
});

export const { addMeal, updateMeal, getMealsByDate } = mealSlice.actions;
export default mealSlice.reducer;
