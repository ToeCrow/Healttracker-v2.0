import React from 'react'
import MacrosBar from '../MealPlaner/MacrosBar'
import KcalStatus from '../MealPlaner/KcalStatus'
import MealTracker from '../MealPlaner/MealTracker'

const MealPlaner = () => {
  return (
    <main className='p-0'>
    <section className="mealplan-header">
      <div className="calorie-counter">
        <KcalStatus />
      </div>
      <MacrosBar />
    </section>
    <section className="mealplan-day">
      <MealTracker />
    </section>
    </main>
  )
}

export default MealPlaner