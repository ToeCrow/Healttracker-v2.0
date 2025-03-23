import React, { useState } from 'react';
import MealComponent from './MelaComponent';

const MealTracker = () => {
    const [meals, setMeals] = useState({
        frukost: 0,
        lunch: 0,
        middag: 0,
        mellanmål: 0,
    });

    const handleAddMeal = (meal) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [meal]: prevMeals[meal] + 100, // Exempel: lägg till 100 kcal
        }));
    };

    return (
        <div className="max-w-sm mx-auto rounded-lg shadow-md p-6 mt-4 fixed-width space-y-4 card">
            <MealComponent mealName="Frukost" kcal={meals.frukost} onAdd={() => handleAddMeal('frukost')} />
            <MealComponent mealName="Lunch" kcal={meals.lunch} onAdd={() => handleAddMeal('lunch')} />
            <MealComponent mealName="Middag" kcal={meals.middag} onAdd={() => handleAddMeal('middag')} />
            <MealComponent mealName="Mellanmål" kcal={meals.mellanmål} onAdd={() => handleAddMeal('mellanmål')} />
        </div>
    );
};

export default MealTracker;