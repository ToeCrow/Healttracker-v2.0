import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./reducers/profileSlice";
import mealReducer from "./reducers/mealSlice";
import { loadMealLogs, saveMealLogs, loadProfile, saveProfile } from "../utils/storage";
import { format } from 'date-fns';

const preloadedState = {
  meals: {
    meals: loadMealLogs(),
    currentDate: format(new Date(), 'yyyy-MM-dd'),
  },
  profile: loadProfile(),
};


const store = configureStore({
  reducer: {
    profile: profileReducer,
    meals: mealReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();
  saveMealLogs(state.meals.meals); // ✅ ändrat till state.meals.meals
  saveProfile(state.profile);
});

export default store;
