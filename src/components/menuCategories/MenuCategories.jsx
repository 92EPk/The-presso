import React from 'react';
import styles from './menuCategories.module.css';
import Link from 'next/link';

// Function to fetch categories data from the API
const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/categories`, {
    cache: "no-store", // Disable caching to ensure fresh data
  });

  // Check if the response is successful
  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json(); // Return the fetched data as JSON
};

// MenuCategories component to display a list of categories
const MenuCategories = async () => {
  let data = null;

  try {
    data = await getData(); // Fetch categories data from the API
  } catch (error) {
    console.error("Error fetching categories:", error); // Log any errors
  }

  // Slice the data to display only the first 6 categories
  const slicedData = data?.slice(0, 6);

  return (
    // Container for the list of categories
    <div className={styles.categoryList}>
      {/* Map through the sliced data and render each category as a link */}
      {slicedData?.map((item) => (
        <Link
          key={item._id} // Unique key for each category
          href={`/blog?cat=${item.slug}`} // Link to filter blog posts by category
          className={`${styles.categoryItem} ${styles[item.slug]}`} // Dynamic class for styling
          shallow // Use shallow routing to avoid unnecessary data fetching
        >
          {item.title} {/* Display the category title */}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;