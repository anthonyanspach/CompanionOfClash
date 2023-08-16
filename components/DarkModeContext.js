import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DarkModeContext = createContext();

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = ({ children }) => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

  useEffect(() => {
    const loadDarkModeSetting = async () => {
      try {
        const darkModeSetting = await AsyncStorage.getItem('darkMode');
        setIsDarkModeEnabled(darkModeSetting === 'true');
      } catch (error) {
        // Handle error
        console.log('Error handling loadDarkModeSetting')
      }
    };
    loadDarkModeSetting();
  }, []);

  const toggleDarkMode = async () => {
    try {
      setIsDarkModeEnabled(prevState => !prevState);
      await AsyncStorage.setItem('darkMode', String(!isDarkModeEnabled));
    } catch (error) {
      console.log('Error toggling Dark Mode')
    }
  };

  const darkModeContextValue = {
    isDarkModeEnabled,
    toggleDarkMode,
  };

  return (
    <DarkModeContext.Provider value={darkModeContextValue}>
      {children}
    </DarkModeContext.Provider>
  );
};
