import React from 'react'
import MacrosBar from '../dashboard/MacrosBar'
import FoodSelector from './FoodSelector'

const AddMeal = () => {
  return (
    <div className='flex flex-col gap-4 card'>
      <MacrosBar/>
      <FoodSelector />
    </div>
  )
}

export default AddMeal