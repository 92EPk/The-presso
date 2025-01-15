import React from 'react';
import styles from './loader.module.css';

// Loader component to display a loading animation
const Loader = () => {
  return (
    // Main container for the loader
    <div className={styles.container}>
      {/* Loader animation container */}
      <div className={styles.loader}>
        {/* Four circles used for the loading animation */}
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default Loader;