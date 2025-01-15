import React from 'react'; // Importing React library
import styles from './cardList.module.css'; // Importing CSS module for styling
import Pagination from '../pagination/Pagination'; // Importing Pagination component
import Card from '../card/Card'; // Importing Card component

// Async function to fetch data from the API
const getData = async (page, cat) => {
  // Fetching posts data from the API with pagination and category filtering
  const res = await fetch(`${process.env.URL}/api/posts?page=${page}&cat=${cat || ""}`, {
    cache: "no-store" // Disabling cache to ensure fresh data is fetched
  });

  // Handling errors if the fetch request fails
  if (!res.ok) {
    throw new Error("Failed"); // Throwing an error if the response is not OK
  }
  return res.json(); // Parsing the response as JSON
}

// CardList component definition
async function CardList({ page, cat }) {
  // Fetching posts and count from the API using the getData function
  const { posts, count } = await getData(page, cat);

  // Constants for pagination
  const POST_PER_PAGE = 6; // Number of posts per page
  const hasPrev = POST_PER_PAGE * (page - 1) > 0; // Boolean to check if there is a previous page
  const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count; // Boolean to check if there is a next page

  return (
    <div className={styles.container}>
      {/* Title for the recent posts section */}
      <h1 className={styles.title}>Recent Posts</h1>

      {/* Container for the list of posts */}
      <div className={styles.posts}>
        {
          // Mapping over the posts array to render each post as a Card component
          posts?.map((item) => (
            <Card item={item} key={item._id} /> // Rendering the Card component with post data
          ))
        }
      </div>

      {/* Pagination component to navigate between pages */}
      <Pagination page={page} hasPrev={hasPrev} hasNext={hasNext} />
    </div>
  )
}

export default CardList; // Exporting the CardList component as the default export