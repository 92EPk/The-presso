"use client"; // Marks this as a Client Component in Next.js
import React, { useContext } from 'react';
import styles from './themeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '@/context/ThemeContext'; // Import the ThemeContext for theme management

// ThemeToggle component to toggle between light and dark themes
function ThemeToggle() {
  // Access the theme context to get the current theme and toggle function
  const { toggle, theme } = useContext(ThemeContext);

  return (
    // Container for the theme toggle switch
    <div
      className={styles.container} // Styling for the container
      onClick={toggle} // Toggle the theme when clicked
      style={
        theme === "dark"
          ? { background: "white" } // Set background to white for dark theme
          : { background: "#0f172a" } // Set background to dark for light theme
      }
    >
      {/* Moon icon for dark theme */}
      <Image src="/moon.png" alt="moon icon" width={14} height={14} />

      {/* Toggle ball that moves based on the theme */}
      <div
        className={styles.ball} // Styling for the toggle ball
        style={
          theme === "dark"
            ? { left: 1, background: "#0f172a" } // Position and color for dark theme
            : { right: 1, background: "white" } // Position and color for light theme
        }
      ></div>

      {/* Sun icon for light theme */}
      <Image src="/sun.png" alt="sun icon" width={16} height={16} />
    </div>
  );
}

export default ThemeToggle;