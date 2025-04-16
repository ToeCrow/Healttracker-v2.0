import React from 'react';

// Måltidskomponent
const MealComponent = ({ mealName, mealSums, onAdd }) => {
    const kcal = mealSums[mealName] || 0;

    return (
        <div
            className="flex items-center justify-between p-4 cursor-pointer border-1 rounded-lg shadow-md"
            onClick={onAdd}
            role="button"
            aria-label={`Lägg till ${mealName}`}
            tabIndex="0"
        >
            <span className="text-lg">{mealName}</span>
            {kcal > 0 && (
                <span className="text-lg">{kcal.toFixed(0)} kcal</span>
            )}
            <span className="border-1 border-black rounded px-2 py-1">+</span>
        </div>
    );
};

export default MealComponent;
