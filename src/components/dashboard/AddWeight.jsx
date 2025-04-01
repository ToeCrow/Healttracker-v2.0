import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addWeight, calculateTDEE } from '@/Redux/reducers/profileSlice'; // Import the thunk
import { Button } from '@/components/ui/button';

const AddWeight = () => {
  const [newWeight, setNewWeight] = useState('');
  const dispatch = useDispatch();
  

  const handleAddWeight = () => {
    if (newWeight) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];

      dispatch(addWeight({
        weight: parseFloat(newWeight),
        date: formattedDate,
      }));

      // Dispatch the TDEE calculation after adding weight
      dispatch(calculateTDEE());

      setNewWeight('');
    }
  };

  return (
    <div className="max-w-sm rounded-lg shadow-md p-6 fixed-width card">
      <h3 className="text-xl font-bold mb-4">Registrera din nya vikt</h3>
      <label htmlFor="new-weight" className="sr-only">
        Ny vikt (kg)
      </label>
      <input
        type="number"
        id="new-weight"
        value={newWeight}
        onChange={(e) => setNewWeight(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleAddWeight();
          }
        }}
        placeholder="Ny vikt (kg)"
        className="block w-full border rounded p-2 mb-4"
      />
      <Button onClick={handleAddWeight} className="w-full">Registrera vikt</Button>
      
    </div>
  );
};

export default AddWeight;