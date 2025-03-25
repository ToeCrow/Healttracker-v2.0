import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";

// Define the thunk
export const calculateTDEE = createAsyncThunk(
  'profile/calculateTDEE',
  async (_, { getState, dispatch }) => {
    const state = getState().profile;
    const { gender, weight, height, age, activityLevel, goal } = state;

    const latestWeight = weight.length > 0 ? weight[weight.length - 1].weight : 0;
    
    const currentWeight = parseFloat(latestWeight);
    const numericHeight = parseFloat(height);
    const numericAge = parseInt(age, 10);
    const numericActivityLevel = parseFloat(activityLevel);
    const numericGoal = parseFloat(goal);

    if (
      isNaN(currentWeight) ||
      !gender ||
      isNaN(numericHeight) ||
      isNaN(numericActivityLevel) ||
      isNaN(numericGoal) ||
      isNaN(numericAge)
    ) {
      return;
    }

    let bmr;
    if (gender === "male") {
      bmr =
        88.36 + 13.4 * currentWeight + 4.8 * numericHeight - 5.7 * numericAge;
    } else if (gender === "female") {
      bmr =
        447.6 + 9.2 * currentWeight + 3.1 * numericHeight - 4.3 * numericAge;
    }

    const totalEnergyExpenditure = bmr * numericActivityLevel + numericGoal;
    dispatch(setTDEE(totalEnergyExpenditure));
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    gender: "",
    weight: [{ id: 0, weight: 0, date: "" }],
    height: 0,
    age: 0,
    activityLevel: 1.2,
    goal: 0,
    tdee: 0,
    birthDate: "åååå-mm-dd",
    proteinLevel: 2, // Standardvärde: 2g/kg
    fatLevel: 0.2, // Standardvärde: 20% av TDEE

    // 🆕 Makronutrienter lagrade i Redux
    macros: {
      proteinGrams: 0,
      proteinKcal: 0,
      proteinPct: 0,
      fatGrams: 0,
      fatKcal: 0,
      fatPct: 0,
      carbohydratesGrams: 0,
      carbohydratesKcal: 0,
      carbohydratesPct: 0,
    },
  },
  reducers: {
    addWeight: (state, action) => {
      const newWeight = {
        id: nanoid(),
        weight: action.payload.weight,
        date: action.payload.date,
      };
      state.weight.push(newWeight);
    },
    displayWeight: (state, action) => {
      state.weight = action.payload;
    },
    editWeight: (state, action) => {
      const { id, weight, date } = action.payload;
      const weightIndex = state.weight.findIndex((weight) => weight.id === id);
      if (weightIndex !== -1) {
        state.weight[weightIndex] = { id, weight, date };
      }
    },
    removeWeight: (state, action) => {
      state.weight = state.weight.filter(weight => weight.id !== action.payload.id);
    },
    setGender: (state, action) => {
      state.gender = action.payload;
    },
    setWeight: (state, action) => {
      state.weight = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setAge: (state, action) => {
      state.age = action.payload;
    },
    setActivityLevel: (state, action) => {
      state.activityLevel = action.payload;
    },
    setGoal: (state, action) => {
      state.goal = parseFloat(action.payload);
    },
    setTDEE: (state, action) => {
      state.tdee = action.payload;
    },
    setBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    setProteinLevel: (state, action) => {
      state.proteinLevel = action.payload;
    },
    setFatLevel: (state, action) => {
      state.fatLevel = action.payload;
    },
    setMacros: (state, action) => {
      state.macros = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateTDEE.fulfilled, (state, action) => {
        // Handle any additional state updates if necessary
      });
  },
});

export const {
  addWeight,
  displayWeight,
  editWeight,
  removeWeight,
  setGender,
  setWeight,
  setHeight,
  setAge,
  setActivityLevel,
  setGoal,
  setTDEE,
  setBirthDate,
  setProteinLevel,
  setFatLevel,
  setMacros
} = profileSlice.actions;

export const selectTDEE = (state) => state.profile.tdee;

export default profileSlice.reducer;
