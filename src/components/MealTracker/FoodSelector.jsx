import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FoodSelector = () => {
  const [foods, setFoods] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await axios.get('http://localhost:3000/livsmedel');
        console.log('Raw API response:', response.data);
    
        // Konvertera objekt till array
        const foodList = Object.values(response.data).map(item => ({
          namn: item.namn
        }));
    
        console.log('Processed food list:', foodList);
        setFoods(foodList);
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };
    

    fetchFoods();
  }, []);

  const filteredFoods = searchTerm.length > 0 
    ? foods.filter(food =>
        (food.namn || '').toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    console.log('Foods:', foods);
    console.log('Search term:', searchTerm);
    console.log('Filtered foods:', filteredFoods);
  }, [foods, searchTerm]);

  return (
    <div className="w-80 mx-auto mt-5">
      <input
        type="text"
        placeholder="Sök livsmedel..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      
      {searchTerm.length > 0 && filteredFoods.length > 0 && (
        <ul className="mt-2 border border-gray-300 rounded bg-white shadow-lg">
          {filteredFoods.map((food, index) => (
            <li
              key={index}
              onClick={() => setSelectedFood(food)}
              className="p-2 hover:bg-blue-100 cursor-pointer"
            >
              {food.namn}
            </li>
          ))}
        </ul>
      )}

      {selectedFood && (
        <h3 className="mt-3 text-lg font-semibold">Vald: {selectedFood.namn}</h3>
      )}
    </div>
  );
};

export default FoodSelector;

