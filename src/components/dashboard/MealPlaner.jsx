import React from 'react'
import MacrosBar from './MacrosBar'
import KcalStatus from './KcalStatus'
import MealTracker from '../MealTracker/MealTracker'

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