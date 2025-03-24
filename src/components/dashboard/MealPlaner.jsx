import React from 'react';
// import MacrosBar from './MacrosBar';
import KcalStatus from './KcalStatus';
import TodaysMeals from './TodaysMeals';

const MealPlaner = () => {
  return (
    <main className="p-0">
      <section className="mealplan-header flex flex-col gap-4"> {/* Använd flexbox med gap */}
        <div className="calorie-counter flex flex-col gap-4">
          <KcalStatus />
        </div>
        {/* <MacrosBar /> */}
      </section>
      <section className="mealplan-day flex flex-col gap-4"> {/* Använd flexbox med gap */}
        <TodaysMeals />
      </section>
    </main>
  );
}

export default MealPlaner;