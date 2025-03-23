import React from 'react';
import AddWeight from '../components/AddWeight';
import TodaysMeals from '../components/dashboard/TodaysMeals';
import KcalStatus from '../components/dashboard/KcalStatus';
import ProfileCard from '../components/dashboard/ProfileCard';
import MakroCalc from '../components/dashboard/MakroCalc';
import MacrosBar from '../components/MacrosBar';

const Dashboard = () => {
  return (
    <main className='flex justify-center items-start'>
      <div className='grid grid-cols-1 grid-cols-custom gap-4 items-start p-4'>

        {/* Left Column */}
        <div className="flex flex-col gap-4">
          <ProfileCard />
          <AddWeight />
        </div>

        {/* Middle Column */}
        <div className="flex flex-col gap-4">
          <MakroCalc />
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4">
          <KcalStatus />
          <TodaysMeals />
          <MacrosBar />
        </div>

      </div>
    </main>
  );
};

export default Dashboard;