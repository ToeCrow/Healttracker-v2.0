const defaultProfile = {
  gender: "male",
  weight: [],
  height: 0,
  age: 0,
  activityLevel: 1.2,
  goal: 0,
  tdee: 0,
  birthDate: "",
  proteinLevel: 2,
  fatLevel: 0.2,
};

const loadFromLocalStorage = (key, defaultValue) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || defaultValue;
  } catch (err) {
    console.error(`Error loading ${key}:`, err);
    return defaultValue;
  }
};

const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key}:`, err);
  }
};

export const loadState = () => {
  const mealLogs = loadFromLocalStorage("mealLogs", []);
  const profile = loadFromLocalStorage("profile", defaultProfile);

  return { meals: { mealLogs }, profile };
};

export const saveState = (state) => {
  saveToLocalStorage("mealLogs", state.meals?.mealLogs || []);
  saveToLocalStorage("profile", state.profile);
};

// Specifika funktioner som använder centraliserade metoder
export const loadMealLogs = () => loadFromLocalStorage("mealLogs", []);
export const saveMealLogs = (mealLogs) => saveToLocalStorage("mealLogs", mealLogs);
export const loadProfile = () => loadFromLocalStorage("profile", defaultProfile);
export const saveProfile = (profile) => saveToLocalStorage("profile", profile);