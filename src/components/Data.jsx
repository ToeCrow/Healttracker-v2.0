import React from 'react'
import { extractNutritionalData } from '../utils/extractData';

const Data = () => {

  const extractedData = extractNutritionalData();
  console.log('extractedData:', extractedData);
  
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