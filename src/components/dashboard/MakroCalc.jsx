import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setProteinLevel, setFatLevel, setMacros } from '@/Redux/reducers/profileSlice';
import EnergyPieChart from '../EnergyPieChart';

const MakroCalc = () => {
  const dispatch = useDispatch();
  const tdee = useSelector((state) => state.profile.tdee) || 0;
  const proteinLevel = useSelector((state) => state.profile.proteinLevel) || 2;
  const fatLevel = useSelector((state) => state.profile.fatLevel) || 0.2;
  const weight = useSelector((state) => state.profile.weight) || [];
  const macros = useSelector((state) => state.profile.macros) || {};

  const latestWeight = weight.length > 0 ? weight[weight.length - 1].weight : 0;

  useEffect(() => {
    if (!tdee || !latestWeight) return; // Säkerställ att vi har giltiga värden

    const proteinGrams = latestWeight * proteinLevel;
    const proteinKcal = proteinGrams * 4;
    const proteinPct = tdee > 0 ? (proteinKcal / tdee) * 100 : 0;

    const fatGrams = (tdee * fatLevel) / 9;
    const fatKcal = fatGrams * 9;
    const fatPct = tdee > 0 ? (fatKcal / tdee) * 100 : 0;

    let carbohydratesKcal = tdee - (proteinKcal + fatKcal);
    carbohydratesKcal = carbohydratesKcal > 0 ? carbohydratesKcal : 0;
    const carbohydratesGrams = carbohydratesKcal / 4;
    const carbohydratesPct = tdee > 0 ? (carbohydratesKcal / tdee) * 100 : 0;

    dispatch(setMacros({
      proteinGrams: Math.round(proteinGrams),
      proteinKcal: Math.round(proteinKcal),
      proteinPct: Math.round(proteinPct),
      fatGrams: Math.round(fatGrams),
      fatKcal: Math.round(fatKcal),
      fatPct: Math.round(fatPct),
      carbohydratesGrams: Math.round(carbohydratesGrams),
      carbohydratesKcal: Math.round(carbohydratesKcal),
      carbohydratesPct: Math.round(carbohydratesPct),
    }));
  }, [tdee, weight, proteinLevel, fatLevel, dispatch]);

  return (
    <div className="max-w-sm mx-autorounded-lg shadow-md p-6 card">
      <h2 className="text-2xl font-bold  mb-4">Hitta dina makros</h2>

      <label htmlFor="protein-level" className="label-custom">
        Välj proteinintag:
      </label>
      <select
        id="protein-level"
        value={proteinLevel}
        onChange={(e) => dispatch(setProteinLevel(parseFloat(e.target.value)))}
        className="block w-full border rounded p-2 mb-4"
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

      <label htmlFor="fat-level" className="label-custom">
        Välj fettintag:
      </label>
      <select
        id="fat-level"
        value={fatLevel}
        onChange={(e) => dispatch(setFatLevel(parseFloat(e.target.value)))}
        className="block w-full border rounded p-2 mb-4"
      >
        <option value={0.15}>15%</option>
        <option value={0.2}>20%</option>
        <option value={0.25}>25%</option>
        <option value={0.3}>30%</option>
        <option value={0.35}>35%</option>
      </select>

      <div className=" p-5">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="p-2"></th>
              <th className="border border-gray-300 p-2">Gram</th>
              <th className="border border-gray-300 p-2">Kcal</th>
              <th className="border border-gray-300 p-2">E%</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 p-2">Protein:</td>
              <td className="border border-gray-300 p-2">{macros.proteinGrams || 0}</td>
              <td className="border border-gray-300 p-2">{macros.proteinKcal || 0}</td>
              <td className="border border-gray-300 p-2">{macros.proteinPct || 0}%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Kolhydrater:</td>
              <td className="border border-gray-300 p-2">{macros.carbohydratesGrams || 0}</td>
              <td className="border border-gray-300 p-2">{macros.carbohydratesKcal || 0}</td>
              <td className="border border-gray-300 p-2">{macros.carbohydratesPct || 0}%</td>
            </tr>
            <tr>
              <td className="border border-gray-300 p-2">Fett:</td>
              <td className="border border-gray-300 p-2">{macros.fatGrams || 0}</td>
              <td className="border border-gray-300 p-2">{macros.fatKcal || 0}</td>
              <td className="border border-gray-300 p-2">{macros.fatPct || 0}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      <EnergyPieChart energyData={[macros.carbohydratesPct || 0, macros.fatPct || 0, macros.proteinPct || 0]} />
    </div>
  );
}

export default MakroCalc;
