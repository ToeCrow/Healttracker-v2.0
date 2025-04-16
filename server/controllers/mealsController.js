export const getMeals = (req, res) => {
  // Hämta från databas (mockdata för nu)
  res.json([{ date: '2025-04-16', mealType: 'Lunch', kcal: 550 }]);
};

export const addMeal = (req, res) => {
  const meal = req.body;
  // Lägg till i databas (mock för nu)
  res.status(201).json({ message: 'Meal added', meal });
};
