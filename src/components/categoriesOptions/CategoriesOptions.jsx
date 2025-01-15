import React from 'react'; // Importing React library

// Async function to fetch categories data from the API
const getData = async () => {
  // Fetching categories data from the API
  const res = await fetch(`http://localhost:3000/api/categories`, {
    cache: "no-store" // Disabling cache to ensure fresh data is fetched
  });

  // Handling errors if the fetch request fails
  if (!res.ok) {
    throw new Error("Failed"); // Throwing an error if the response is not OK
  }
  return res.json(); // Parsing the response as JSON
}

// CategoriesOptions component definition
const CategoriesOptions = async () => {
  // Fetching categories data using the getData function
  const categories = await getData();

  return (
    <>
      {/* Default option for the dropdown */}
      <option value="">Category</option>
      {
        // Mapping over the categories array to render each category as an option
        categories?.map((category) => (
          <option key={category?.id} value={category?.slug}>{category?.title}</option>
        ))
      }
    </>
  )
}

export default CategoriesOptions; // Exporting the CategoriesOptions component as the default export