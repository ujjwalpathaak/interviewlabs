import React, { useEffect } from 'react';
import './DarkModeToggle.css'; // For custom styling
import { usePeer } from '../context/Peer';
import moon from "../assets/moon.png";

const DarkModeToggle = () => {
  const {
    setDarkMode,
    darkMode,
  } = usePeer();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const handleToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`dark-mode-toggle mr-5`}
      onClick={handleToggle}
    >
      {darkMode ? (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="5" stroke="#FFD700" strokeWidth="2" />
          <path d="M12 1V3" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M12 21V23" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.22 4.22L5.64 5.64" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.36 18.36L19.78 19.78" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 12H3" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M21 12H23" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4.22 19.78L5.64 18.36" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M18.36 5.64L19.78 4.22" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
<img src={moon} alt="moon" className='w-[30px]' />
      )}
    </div>
  );
};

export default DarkModeToggle;
