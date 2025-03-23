import React from 'react';

// Måltidskomponent
const MealComponent = ({ mealName, kcal, onAdd }) => {
    return (
        <div
            className="flex items-center justify-between p-4 cursor-pointer bg-gray-200 hover:bg-gray-300"
            onClick={onAdd}
            role="button"
            aria-label={`Lägg till ${mealName}`}
            tabIndex="0"
        >
            <span className="text-lg">{mealName}</span>
            <span className={`text-lg ${kcal === 0 ? 'hidden' : 'inline'}`}>{kcal} kcal</span>
            <span className="border-1 border-black rounded px-2 py-1">+</span>
        </div>
    );
};

export default MealComponent;