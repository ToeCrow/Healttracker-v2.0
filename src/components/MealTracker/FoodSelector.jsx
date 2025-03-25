import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodSelector = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/livsmedel'); // Justera sökvägen
        const foodList = Object.values(response.data.livsmedel).map(item => ({
          namn: item[Object.keys(item)[0]].namn,
          naringsvarden: item[Object.keys(item)[0]].naringsvarden
        }));
        setFoods(foodList);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    fetchFoods();
  }, []);

  const filteredFoods = foods.filter(food =>
    food.namn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Sök livsmedel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredFoods.map((food, index) => (
          <li key={index} onClick={() => setSelectedFood(food)}>
            {food.namn}
          </li>
        ))}
      </ul>
      {selectedFood && (
        <div>
          <h3>Vald: {selectedFood.namn}</h3>
          <ul>
            {selectedFood.naringsvarden.map((nv, idx) => (
              <li key={idx}>
                {nv.namn}: {nv.varde} {nv.enhet}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FoodSelector;