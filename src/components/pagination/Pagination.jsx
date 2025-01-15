"use client"; // Marks this as a Client Component in Next.js
import React from 'react';
import styles from './pagination.module.css';
import { useRouter } from 'next/navigation'; // Import the useRouter hook for navigation

// Pagination component to handle navigation between pages
function Pagination({ page, hasPrev, hasNext }) {
  const router = useRouter(); // Initialize the router for navigation

  return (
    // Container for the pagination buttons
    <div className={styles.container}>
      {/* Previous Button */}
      <button
        className={styles.button} // Styling for the button
        disabled={!hasPrev} // Disable the button if there is no previous page
        onClick={() => router.push(`?page=${page - 1}`, { shallow: true })} // Navigate to the previous page
      >
        Previous
      </button>

      {/* Next Button */}
      <button
        className={styles.button} // Styling for the button
        disabled={!hasNext} // Disable the button if there is no next page
        onClick={() => router.push(`?page=${page + 1}`, { shallow: true })} // Navigate to the next page
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;