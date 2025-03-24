import React from 'react'
import { useSelector } from 'react-redux'

const MacrosBar = () => {
  const macros = useSelector((state) => state.profile.macros) || {};

  return (
    <div className="max-w-sm mx-auto rounded-lg shadow-md p-6 mt-4 fixed-width card gap-4 flex flex-col">
    <div className='flex justify-between border-2 border-black p-2 m-4 rounded'>
      <div className='flex-col'>
      <p className='font-bold text-xs'>Protein:</p>
      {/* Måste få in hur mycket g av de olika som har ätits idag */}
      <p className='font-bold text-xs'>0/{macros.proteinGrams}g</p>
      </div>
      <div className='flex-col'>
      <p className='font-bold text-xs'>Kolhydrater:</p>
      <p className='font-bold text-xs'>0/{macros.carbohydratesGrams}g</p>
      </div>
      <div className='flex-col'>
      <p className='font-bold text-xs'>Fett:</p>
      <p className='font-bold text-xs'>0/{macros.fatGrams}g</p>
      </div>
    </div>
    </div>
  )
}

export default MacrosBar