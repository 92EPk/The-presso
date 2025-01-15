import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';
import Link from 'next/link';

// Function to fetch featured data from the API
const getData = async () => {
  const res = await fetch(`${process.env.URL}/api/featured`, {
    cache: "no-store", // Disable caching to ensure fresh data
  });

  // Check if the response is successful
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const json = await res.json(); // Parse the JSON response

  // Ensure the response contains an image URL
  if (!json || !json.img) {
    throw new Error("Image is missing in the API response");
  }

  return json; // Return the fetched data
};

// Featured component to display the featured post
async function Featured() {
  let data = null;

  try {
    data = await getData(); // Fetch data from the API
  } catch (error) {
    console.error("Error fetching featured data:", error); // Log any errors
  }

  // Fallback content if data is null or invalid
  if (!data || !data.img) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>
          <b>The Presso -</b> A Space to Share Your Thoughts
        </h1>
        <p className={styles.errorMessage}>
          Featured content is currently unavailable. Please check back later.
        </p>
      </div>
    );
  }

  // Render the featured post
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b>The Presso -</b> A Space to Share Your Thoughts
      </h1>

      <div className={styles.post}>
        <div className={styles.imgContainer}>
          {/* Check if the image URL exists and render the image */}
          {data.img && (
            <Image
              src={data.img}
              alt="featured"
              fill
              sizes="(max-width: 1024px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
              priority // Prioritize loading this image
            />
          )}
        </div>

        <div className={styles.textContainer}>
          {/* Link to the post's detail page */}
          <Link href={`/posts/${data?.slug}`} shallow>
            <h2 className={styles.postTitle}>{data?.title}</h2>
          </Link>
          {/* Render the post description (limited to 250 characters) */}
          <p
            className={styles.postDesc}
            dangerouslySetInnerHTML={{
              __html: data?.desc?.substring(0, 250) + '...',
            }}
          ></p>
          {/* Link to the post's detail page */}
          <Link href={`/posts/${data?.slug}`} className={styles.button} shallow>
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Featured;