import React from 'react';
import styles from './menuPosts.module.css';
import Link from 'next/link';
import Image from 'next/image';

// Function to fetch editor's choice posts from the API
const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/posts/editorchoice`, {
    cache: "no-store", // Disable caching to ensure fresh data
  });

  // Check if the response is successful
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json(); // Return the fetched data as JSON
};

// MenuPosts component to display editor's choice posts
const MenuPosts = async () => {
  let posts = [];

  try {
    posts = await getData(); // Fetch editor's choice posts
  } catch (error) {
    console.error("Error fetching editor's choice posts:", error); // Log any errors
  }

  // Fallback UI if no posts are available
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className={styles.items}>
        <p>No editor's choice posts available at the moment.</p>
      </div>
    );
  }

  return (
    // Container for the list of editor's choice posts
    <div className={styles.items}>
      {/* Map through the posts and render each post as a link */}
      {posts.map((post) => (
        <Link
          href={`/posts/${post?.slug}`} // Link to the post's detail page
          className={styles.item} // Styling for the post item
          key={post?._id} // Unique key for each post
          shallow // Use shallow routing to avoid unnecessary data fetching
        >
          {/* Container for the post image */}
          <div className={styles.imageContainer}>
            <Image
              src={post?.img} // Image URL
              alt="" // Empty alt text (since the image is decorative)
              fill // Fill the container with the image
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Responsive image sizing
              className={styles.image} // Styling for the image
            />
          </div>

          {/* Container for the post text content */}
          <div className={styles.textContainer}>
            {/* Display the post category */}
            <span className={`${styles.category} ${styles.travel}`}>
              {post?.catSlug}
            </span>

            {/* Display the post title */}
            <h3 className={styles.postTitle}>{post?.title}</h3>

            {/* Display the post creation date */}
            <div className={styles.detail}>
              <span className={styles.date}>
                {post?.createdAt?.substring(0, 10)} // Display only the date part
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MenuPosts;