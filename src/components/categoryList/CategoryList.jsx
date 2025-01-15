import React from 'react'; // Importing React library
import styles from './categoryList.module.css'; // Importing CSS module for styling
import Link from 'next/link'; // Importing Next.js Link component for client-side navigation
import Image from 'next/image'; // Importing Next.js Image component for optimized images

// Async function to fetch categories data from the API
const getData = async () => {
  // Fetching categories data from the API
  const res = await fetch(`${process.env.URL}/api/categories`, {
    cache: "no-store" // Disabling cache to ensure fresh data is fetched
  });

  // Handling errors if the fetch request fails
  if (!res.ok) {
    throw new Error("Failed"); // Throwing an error if the response is not OK
  }

  return res.json(); // Parsing the response as JSON
}

// CategoryList component definition
async function CategoryList() {
  // Fetching categories data using the getData function
  const data = await getData();

  // Slicing the data to display only the first 6 categories
  const slicedData = Array.isArray(data) ? data.slice(0, 6) : [];

  return (
    <div className={styles.container}>
      {/* Title for the popular categories section */}
      <h1 className={styles.title}>Popular Categories</h1>

      {/* Container for the list of categories */}
      <div className={styles.categories}>
        {
          // Mapping over the slicedData array to render each category as a Link component
          slicedData?.map((item) => (
            <Link 
              key={item._id} // Unique key for the component
              href={`/blog?cat=${item.slug}`} // Link to the category page
              className={`${styles.category} ${styles[item.slug]}`} // Applying CSS classes dynamically
              shallow // Using shallow routing to avoid unnecessary data fetching
            >
              {/* Rendering the category image if available */}
              {item.img && (
                <Image 
                  src={item.img} // Image source
                  alt='' // Empty alt text (should be filled for accessibility)
                  width={32} // Image width
                  height={32} // Image height
                  className={styles.image} // Applying CSS class from the module
                />
              )}
              {/* Displaying the category title */}
              {item.title}
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default CategoryList; // Exporting the CategoryList component as the default export