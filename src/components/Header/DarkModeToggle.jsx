import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react'; // Importera sol- och måneikoner

const DarkModeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Effekt för att uppdatera body-klass
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <button
      onClick={() => setIsDarkMode(!isDarkMode)}
      className="flex items-center p-2 bg-gray-800 text-white rounded-md"
    >
      {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
      {/* <span className="ml-2">{isDarkMode ? 'Ljust läge' : 'Mörkt läge'}</span> */}
    </button>
  );
};

export default DarkModeToggle;