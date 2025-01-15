// Import necessary modules and components
import React, { Suspense } from 'react'
import styles from './blogPage.module.css';
import CardList from '@/components/cardList/CardList';
import Menu from '@/components/Menu/Menu';
import Loader from '@/components/loader/Loader';

// Main BlogPage component that takes searchParams as props
const BlogPage = ({searchParams}) => {

  // Parse the page number from searchParams or default to 1
  const page = parseInt(searchParams.page) || 1;
  
  // Destructure the category (cat) from searchParams
  const { cat } = searchParams;

  // Return the JSX for the BlogPage
  return (
    // Use Suspense to show a fallback Loader while content is being loaded
    <Suspense fallback={<Loader />}>
      <div className={styles.container}>
        {/* Display the category title */}
        <h1 className={styles.title}>Category: {cat}</h1>
        <div className={styles.content}>
          {/* Render the CardList component with the current page and category */}
          <CardList page={page} cat={cat} />
          
          {/* Render the Menu component */}
          <Menu />
        </div>
      </div>
    </Suspense>
  )
}

// Export the BlogPage component as the default export
export default BlogPage