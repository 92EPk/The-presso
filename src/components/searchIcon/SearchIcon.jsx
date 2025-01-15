import React from 'react';
import styles from './searchIcon.module.css';

// SearchIcon component to display a search input with an icon
const SearchIcon = () => {
  return (
    // Main container for the search input and icon
    <div>
      {/* Container for the input box and search icon */}
      <div className={styles.inputBox_container}>
        {/* Search icon SVG */}
        <svg
          className={styles.search_icon} // Styling for the search icon
          xmlns="http://www.w3.org/2000/svg" // SVG namespace
          viewBox="0 0 48 48" // SVG viewBox for scaling
          alt="search icon" // Accessibility description
        >
          {/* Path for the search icon */}
          <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z"></path>
        </svg>

        {/* Search input field */}
        <input
          className={styles.inputBox} // Styling for the input box
          id="inputBox" // Unique ID for the input field
          type="text" // Input type is text
          placeholder="Search for blogs..." // Placeholder text for the input
        />
      </div>
    </div>
  );
};

export default SearchIcon;