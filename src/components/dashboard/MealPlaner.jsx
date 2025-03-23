import React from 'react'
import MacrosBar from './MacrosBar'
import KcalStatus from './KcalStatus'
import TodaysMeals from './TodaysMeals'

const MealPlaner = () => {
  return (
    <main className="max-w-sm mx-auto rounded-lg shadow-md p-6 mt-4 fixed-width card">
    <section className="mealplan-header">
      <div className="calorie-counter">
        <KcalStatus />
      </div>
      <MacrosBar />
    </section>
    <section className="mealplan-day">
      <TodaysMeals />
    </section>
    </main>
  )
}

export default MealPlaner