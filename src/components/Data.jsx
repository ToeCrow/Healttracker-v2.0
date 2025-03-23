import React from 'react'


const Data = () => {


  
  return (
    <div>
      <h1>Livsmedel Information</h1>
      <ul>
        {extractedData.map(item => (
          <li key={item.nummer}>
            <a href={item.naringsvardenLink}>{item.namn} (Nummer: {item.nummer})</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Data