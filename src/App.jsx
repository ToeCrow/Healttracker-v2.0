import { Outlet} from 'react-router-dom' // fixed import, changed from react-router to react-router-dom
import './App.css'
// import { useEffect } from 'react';
import Header from './components/Header/Header'
import Footer from './components/Footer'
// import { mealLog } from './utils/store'

function App() {



  return (
    <div className="flex flex-col min-h-screen">
    <a href="#main-content" className="absolute top-[-40px] left-0 bg-black text-white p-2 z-50 transition-all duration-300 focus:top-2 focus:block">
    Hoppa till innehåll
    </a>
    <Header />
    <Outlet />
    <Footer />
    </div>

  ) 
}

export default App
