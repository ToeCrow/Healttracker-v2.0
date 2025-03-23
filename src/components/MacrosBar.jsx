import React from 'react'

const MacrosBar = () => {
  const gramOfProtein = useSelector((state) => state.profile.gramOfProtein);
  const gramOfFat = useSelector((state) => state.profile.gramOfFat);
  const gramOfCarbohydrates = useSelector((state) => state.profile.gramOfCarbohydrates);

  return (
    <div className='flex justify-between'>
      <div className='flex-col'>
      <p>Protein:</p>
      <p>{gramOfProtein} g</p>
      </div>
      <div className='flex-col'>
      <p>Fett:</p>
      <p>{gramOfFat} g</p>
      </div>
      <div className='flex-col'>
      <p>Kolhydrater:</p>
      <p>{gramOfCarbohydrates} g</p>
      </div>
    </div>
  )
}

export default MacrosBar