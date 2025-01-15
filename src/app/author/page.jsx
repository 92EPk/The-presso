// Import necessary modules and components
import React, { Suspense } from 'react'
import styles from './author.module.css';
import Menu from '@/components/Menu/Menu';
import Loader from '@/components/loader/Loader';
import Pagination from '@/components/pagination/Pagination';
import Card from '@/components/card/Card';

// Function to fetch data from the API based on the postId
const getData = async (posId) => {
    const res = await fetch(`${process.env.URL}/api/author?postId=${posId}`,{
      cache: "no-store" // Ensure no caching to get fresh data
    });
  
    // Check if the response is not OK and throw an error if it fails
    if(!res.ok){
      throw new Error("Failed")
    }
  
    // Return the parsed JSON data
    return res.json();
  }

// Main AuthorPage component that takes searchParams as props
const AuthorPage = async ({searchParams}) => {

  // Parse the page number from searchParams or default to 1
  const page = parseInt(searchParams.page) || 1;
  
  // Destructure name and postId from searchParams
  const { name, postId } = searchParams;
  
  // Fetch data using the getData function with the postId
  const data = await getData(postId);

  // Return the JSX for the AuthorPage
  return (
    // Use Suspense to show a fallback Loader while data is being fetched
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        {/* Display the author's name */}
        <h1 className={styles.title}>Author: {name}</h1>
        <div className={styles.content}>
            
        <div className={styles.container}>
        <div className={styles.posts}>
            {/* Map over the fetched data and render a Card component for each item */}
            {
            data?.map((item) => (
                <Card item={item} key={item._id} name={name} />
            ))
            }
        </div>
        </div>

        {/* Render the Menu component */}
        <Menu />
        </div>
    </div>
    </Suspense>
  )
}

// Export the AuthorPage component as the default export
export default AuthorPage