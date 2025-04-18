import React from 'react'
import WeightListItem from './WeightListItem'

function WeightList({weightData}) {

  // Sortera listan efter datum
  const sortedWeightData = [...weightData].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div  className="max-w-sm mx-auto card rounded-lg shadow-md p-6 mt-4 fixed-width">
      <h3 className='text-lg font-bold mb-4'>Historik Vikt</h3>
      {sortedWeightData.length > 0 ? (
        sortedWeightData.map((weight) => (
          <WeightListItem key={weight.id} weightData={weight} />
        ))
      ) : (
        <p className='text-gray-500'>Ingen vikt registrerad.</p>
      )}
    </div>
  )
}

export default WeightList
