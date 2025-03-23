import React from 'react'
import { useSelector } from 'react-redux'

const MacrosBar = () => {
  const macros = useSelector((state) => state.profile.macros) || {};

  return (
    <div className='flex justify-between'>
      <div className='flex-col'>
      <p>Protein:</p>
      {/* Måste få in hur mycket g av de olika som har ätits idag */}
      <p>{macros.proteinGrams} g</p>
      </div>
      <div className='flex-col'>
      <p>Kolhydrater:</p>
      <p>{macros.carbohydratesGrams} g</p>
      </div>
      <div className='flex-col'>
      <p>Fett:</p>
      <p>{macros.fatGrams} g</p>
      </div>
    </div>
  )
}

export default MacrosBar