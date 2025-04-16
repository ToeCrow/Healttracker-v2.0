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

const defaultMealLogs = []; // Viktigt! Alltid array

// ✅ Generisk loader
const loadFromLocalStorage = (key, defaultValue) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return Array.isArray(defaultValue) && !Array.isArray(data)
      ? defaultValue
      : data ?? defaultValue;
  } catch (err) {
    console.error(`Error loading ${key}:`, err);
    return defaultValue;
  }
};

// ✅ Generisk saver
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Error saving ${key}:`, err);
  }
};

export const loadMealLogs = () => loadFromLocalStorage("mealLogs", defaultMealLogs);
export const saveMealLogs = (mealLogs) => saveToLocalStorage("mealLogs", mealLogs);

export const loadProfile = () => loadFromLocalStorage("profile", defaultProfile);
export const saveProfile = (profile) => saveToLocalStorage("profile", profile);
