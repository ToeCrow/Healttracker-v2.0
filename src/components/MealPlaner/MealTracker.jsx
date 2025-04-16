import React from 'react';
import MealComponent from './MealComponent';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { SquareArrowRight, SquareArrowLeft } from 'lucide-react';
import { prevDay, nextDay } from "../../Redux/reducers/mealSlice";


const MealTracker = () => {
    const navigate = useNavigate();
    const allMeals = useSelector((state) => state.meals.meals);
    const currentDate = useSelector((state) => state.meals.currentDate);
    const dispatch = useDispatch();

    const todaysMeals = allMeals.filter(meal => meal.date === currentDate);

    const handlePrev = () => dispatch(prevDay());
    const handleNext = () => dispatch(nextDay());

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
                date: currentDate,
                mealType: mealType,
            },
        });
    };

    return (
        <div className="max-w-sm mx-auto rounded-lg shadow-md p-6 mt-4 fixed-width space-y-4 card">
            <div className='flex items-center justify-center gap-4'>
                {/* to the left, for previous day */}
                <SquareArrowLeft onClick={handlePrev} className="cursor-pointer" />
                <h2>{currentDate}</h2>
                {/* to the right, for next day */}
                <SquareArrowRight onClick={handleNext} className="cursor-pointer" />
            </div>
            <MealComponent mealName="Frukost" mealSums={mealSums} onAdd={() => handleAddMeal('Frukost')} />
            <MealComponent mealName="Lunch" mealSums={mealSums} onAdd={() => handleAddMeal('Lunch')} />
            <MealComponent mealName="Middag" mealSums={mealSums} onAdd={() => handleAddMeal('Middag')} />
            <MealComponent mealName="Mellanmål" mealSums={mealSums} onAdd={() => handleAddMeal('Mellanmål')} />
        </div>
    );
};


export default MealTracker;
