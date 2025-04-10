import React, { createContext, useState, useContext } from 'react';

// Create the context
const NavContext = createContext();

// Create a provider component
export const NavProvider = ({ children }) => {
  // State to track the active navigation item
  const [activeNavItem, setActiveNavItem] = useState('Pekerjaan');

  return (
    <NavContext.Provider value={{ activeNavItem, setActiveNavItem }}>
      {children}
    </NavContext.Provider>
  );
};

// Custom hook to easily use the context
export const useNavContext = () => {
  // This will throw an error if used outside a NavProvider
  const context = useContext(NavContext);
  if (!context) {
    throw new Error('useNavContext must be used within a NavProvider');
  }
  return context;
};