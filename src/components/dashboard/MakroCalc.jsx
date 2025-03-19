import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProteinIntake, setFatIntake } from '@/Redux/reducers/profileSlice';
import EnergyPieChart from '../EnergyPieChart';

const MakroCalc = () => {
  const tdee = useSelector((state) => state.profile.tdee);
  const proteinIntake = useSelector((state) => state.profile.proteinIntake);
  const fatIntake = useSelector((state) => state.profile.fatIntake);
  const weight = useSelector((state) => state.profile.weight);
  const dispatch = useDispatch();
  
  // State för att lagra beräknade värden
  const [gramOfProtein, setGramOfProtein] = useState(0);
  const [kcalOfProtein, setKcalOfProtein] = useState(0);
  const [procentOfProtein, setProcentOfProtein] = useState(0);
  const [gramOfFat, setGramOfFat] = useState(0);
  const [kcalOfFat, setKcalOfFat] = useState(0);
  const [procentOfFat, setProcentOfFat] = useState(0);
  const [gramOfCarbohydrates, setGramOfCarbohydrates] = useState(0);
  const [kcalOfCarbohydrates, setKcalOfCarbohydrates] = useState(0);
  const [procentOfCarbohydrates, setProcentOfCarbohydrates] = useState(0);
  const latestWeight = weight.length > 0 ? weight[weight.length - 1].weight : 0;

  useEffect(() => {
    // Säkerställ att värden är nummer
    const validTDEE = parseFloat(tdee) || 0;
    const validWeight = parseFloat(latestWeight) || 0;
    const validProteinIntake = parseFloat(proteinIntake) || 0;
    const validFatIntake = parseFloat(fatIntake) || 0;

    const proteinGrams = validWeight * validProteinIntake;
    const proteinKcal = proteinGrams * 4;
    const proteinPct = (proteinKcal / validTDEE) * 100;

    const fatGrams = (validTDEE * validFatIntake) / 9;
    const fatKcal = fatGrams * 9;
    const fatPct = (fatKcal / validTDEE) * 100;

    const carbohydratesKcal = validTDEE - proteinKcal - fatKcal;
    const carbohydratesGrams = carbohydratesKcal / 4;
    const carbohydratesPct = (carbohydratesKcal / validTDEE) * 100;

    // Uppdatera state med beräknade värden
    setGramOfProtein(Math.round(proteinGrams));
    setKcalOfProtein(Math.round(proteinKcal));
    setProcentOfProtein(Math.round(proteinPct));
    setGramOfFat(Math.round(fatGrams));
    setKcalOfFat(Math.round(fatKcal));
    setProcentOfFat(Math.round(fatPct));
    setGramOfCarbohydrates(Math.round(carbohydratesGrams));
    setKcalOfCarbohydrates(Math.round(carbohydratesKcal));
    setProcentOfCarbohydrates(Math.round(carbohydratesPct));
  }, [tdee, weight, proteinIntake, fatIntake]); // Beräkningar körs när dessa värden ändras

  return (
    <div>
      <h2 className="text-lg text-green-600 mt-4 text-center">Hitta dina makros</h2>
      <h2 className="text-lg text-green-600 mt-4 text-center">
        Ditt totala dagliga energibehov: <br />
        <span className="font-bold">{Math.round(tdee)} kcal</span>
      </h2>
      
      <label htmlFor="protein-intake" className="label-custom">
        Välj proteinintag:
      </label>
      <select
        id="protein-intake"
        value={proteinIntake}
        required
        onChange={(e) =>
          dispatch(setProteinIntake(parseFloat(e.target.value)))
        }
        className={`block w-full border rounded p-2 mb-4 ${proteinIntake ? "" : "border-accent border-2"}`}
      >
        <option value={1.5}>1,5 gram/kg vikt</option>
        <option value={1.6}>1,6 gram/kg vikt</option> 
        <option value={1.7}>1,7 gram/kg vikt</option>
        <option value={1.8}>1,8 gram/kg vikt</option>
        <option value={1.9}>1,9 gram/kg vikt</option>
        <option value={2}>2 gram/kg vikt</option>
        <option value={2.1}>2,1 gram/kg vikt</option>
        <option value={2.2}>2,2 gram/kg vikt</option>
      </select>

      <label htmlFor="fat-intake" className="label-custom">
        Välj fettintag:
      </label>
      <select
        id="fat-intake"
        value={fatIntake}
        required
        onChange={(e) =>
          dispatch(setFatIntake(parseFloat(e.target.value)))
        }
        className={`block w-full border rounded p-2 mb-4 ${fatIntake ? "" : "border-accent border-2"}`}
      >
        <option value={0.15}>15%</option>
        <option value={0.2}>20%</option> 
        <option value={0.25}>25%</option>
        <option value={0.3}>30%</option>
        <option value={0.35}>35%</option>       
      </select>

      <EnergyPieChart energyData={[procentOfCarbohydrates, procentOfFat, procentOfProtein]} />

      <div className="bg-gray-100 p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th className="border border-gray-300 p-2">Gram</th>
              <th className="border border-gray-300 p-2">Kcal</th>
              <th className="border border-gray-300 p-2">Energiprocent</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Protein:</td>
              <td className="border border-gray-300 p-2">{gramOfProtein}</td>
              <td className="border border-gray-300 p-2">{kcalOfProtein}</td>
              <td className="border border-gray-300 p-2">{procentOfProtein}%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Kolhydrater:</td>
              <td className="border border-gray-300 p-2">{gramOfCarbohydrates}</td>
              <td className="border border-gray-300 p-2">{kcalOfCarbohydrates}</td>
              <td className="border border-gray-300 p-2">{procentOfCarbohydrates}%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Fett:</td>
              <td className="border border-gray-300 p-2">{gramOfFat}</td>
              <td className="border border-gray-300 p-2">{kcalOfFat}</td>
              <td className="border border-gray-300 p-2">{procentOfFat}%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MakroCalc;