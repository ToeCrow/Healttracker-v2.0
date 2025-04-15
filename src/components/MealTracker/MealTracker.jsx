import React, { useState } from 'react';
import MealComponent from './MealComponent';
import { useNavigate } from 'react-router-dom';

const MealTracker = () => {
    const navigate = useNavigate();
    const [meals, setMeals] = useState({
        frukost: 0,
        lunch: 0,
        middag: 0,
        mellanmål: 0,
    });

    const today = new Date().toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const handleAddMeal = (mealType) => {
        setMeals((prevMeals) => ({
            ...prevMeals,
            [mealType]: prevMeals[mealType] + 100,
        }));

        navigate('/add-meal', {
            state: {
                date: today,
                mealType: mealType,
            },
        });
    };


    return (
        <div className="max-w-sm mx-auto rounded-lg shadow-md p-6 mt-4 fixed-width space-y-4 card">
            <h2>{today}</h2>
            <MealComponent mealName="Frukost" kcal={meals.frukost} onAdd={() => handleAddMeal('Frukost')} />
            <MealComponent mealName="Lunch" kcal={meals.lunch} onAdd={() => handleAddMeal('Lunch')} />
            <MealComponent mealName="Middag" kcal={meals.middag} onAdd={() => handleAddMeal('Middag')} />
            <MealComponent mealName="Mellanmål" kcal={meals.mellanmål} onAdd={() => handleAddMeal('Mellanmål')} />
        </div>
    );
};

export default MealTracker;