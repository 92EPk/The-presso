"use client"; // Marks this as a Client Component in Next.js
import { createContext, useEffect, useState } from 'react';

// Create a context for managing the theme
export const ThemeContext = createContext();

// Helper function to retrieve the theme from localStorage
const getFromLocalStorage = () => {
  // Check if the code is running in the browser (window is defined)
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme"); // Retrieve the theme from localStorage
    return value || "light"; // Return the stored theme or default to "light"
  }
};

// ThemeContextProvider component to provide theme state and toggle functionality
export const ThemeContextProvider = ({ children }) => {
  // State to manage the current theme
  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage(); // Initialize the theme from localStorage
  });

  // Function to toggle between light and dark themes
  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light"); // Toggle the theme state
  };

  // Effect to save the current theme to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("theme", theme); // Save the theme to localStorage
  }, [theme]);

  // Provide the theme and toggle function to child components via Context
  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};