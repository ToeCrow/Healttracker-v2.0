import React from 'react';
import MealComponent from './MealComponent';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SquareArrowRight, SquareArrowLeft } from 'lucide-react';

const MealTracker = () => {
    const navigate = useNavigate();
    const allMeals = useSelector((state) => state.meals.meals);

    const today = new Date().toLocaleDateString('sv-SE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    const todaysMeals = allMeals.filter(meal => meal.date === today);

    const mealSums = {
        Frukost: 0,
        Lunch: 0,
        Middag: 0,
        Mellanmål: 0,
    };

    todaysMeals.forEach((meal) => {
        const type = meal.mealType;
        const kcal = meal.total?.kcal || 0;
        mealSums[type] += Number(kcal);
    });

    const handleAddMeal = (mealType) => {
        navigate('/add-meal', {
            state: {
                date: today,
                mealType: mealType,
            },
        });
    };

    return (
        <div className="max-w-sm mx-auto rounded-lg shadow-md p-6 mt-4 fixed-width space-y-4 card">
            <div className='flex items-center justify-center gap-4'>
            <SquareArrowLeft/>
                <h2>{today}</h2>
            <SquareArrowRight/>
            </div>
            <MealComponent mealName="Frukost" mealSums={mealSums} onAdd={() => handleAddMeal('Frukost')} />
            <MealComponent mealName="Lunch" mealSums={mealSums} onAdd={() => handleAddMeal('Lunch')} />
            <MealComponent mealName="Middag" mealSums={mealSums} onAdd={() => handleAddMeal('Middag')} />
            <MealComponent mealName="Mellanmål" mealSums={mealSums} onAdd={() => handleAddMeal('Mellanmål')} />
        </div>
    );
};


export default MealTracker;
