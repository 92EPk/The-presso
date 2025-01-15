"use client"; // Indicates that this is a Client Component in Next.js
import React, { useState } from 'react'; // Importing React and useState hook
import styles from './comments.module.css'; // Importing CSS module for styling
import Link from 'next/link'; // Importing Next.js Link component for client-side navigation
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import useSWR from 'swr'; // Importing useSWR hook for data fetching
import { useSession } from 'next-auth/react'; // Importing useSession hook for authentication status

// Fetcher function for useSWR to fetch data from the API
const fetcher = async (url) => {
  const res = await fetch(url); // Fetching data from the provided URL

  const data = await res.json(); // Parsing the response as JSON

  // Handling errors if the response is not OK
  if (!res.ok) {
    const error = new Error(data.message); // Creating a new error with the error message
    throw error; // Throwing the error
  }

  return data; // Returning the parsed data
}

// Comments component definition
const Comments = ({ postSlug }) => {
  const { status } = useSession(); // Getting the authentication status using useSession
  const { data, mutate, isLoading } = useSWR(
    `http://localhost:3000/api/comments?postSlug=${postSlug}`, // Fetching comments for the specific post
    fetcher // Using the fetcher function to fetch data
  );

  const [desc, setDesc] = useState(""); // State to manage the comment input

  // Function to handle comment submission
  const handleSubmit = async () => {
    await fetch("/api/comments", {
      method: "POST", // Using POST method to submit the comment
      body: JSON.stringify({ desc, postSlug }), // Sending the comment text and post slug in the request body
    });
    setDesc(""); // Clearing the comment input after submission
    mutate(); // Revalidating the comments data to reflect the new comment
  }

  return (
    <div className={styles.container}>
      {/* Title for the comments section */}
      <h1 className={styles.title}>Comments</h1>

      {/* Conditional rendering based on authentication status */}
      {
        status === "authenticated" ? (
          // If authenticated, show the comment input form
          <div className={styles.write}>
            <textarea 
              placeholder='write a comment...' // Placeholder text for the textarea
              className={styles.input} // Applying CSS class from the module
              onChange={e => setDesc(e.target.value)} // Updating the state with the input value
            />
            <button 
              className={styles.button} // Applying CSS class from the module
              onClick={handleSubmit} // Handling the submit action
            >
              Send
            </button>
          </div>
        ) : (
          // If not authenticated, show a link to the login page
          <Link href='/login'><u>Login to write a comment</u></Link>
        )
      }

      {/* Container for displaying comments */}
      <div className={styles.comments}>
        {
          // Conditional rendering based on loading state
          isLoading ? "" : 
            // Mapping over the comments data to render each comment
            data?.map((item) => (
              <div className={styles.comment} key={item._id}>
                {/* User information section */}
                <div className={styles.user}>
                  {/* Rendering the user's image if available */}
                  {item?.user?.image && (
                    <Image 
                      src={item.user.image} // Image source
                      alt='' // Empty alt text (should be filled for accessibility)
                      width={50} // Image width
                      height={50} // Image height
                      className={styles.image} // Applying CSS class from the module
                    />
                  )}
                  {/* User details */}
                  <div className={styles.userInfo}>
                    <span className={styles.username}>{item.user.name}</span> {/* Displaying the user's name */}
                    <span className={styles.date}>
                      {item.createdAt.substring(0, 10)} at {item.createdAt.substring(11, 16)} {/* Displaying the comment date and time */}
                    </span>
                  </div>
                </div>
                {/* Comment text */}
                <p className={styles.desc}>{item.desc}</p>
              </div>
            ))
        }
      </div>
    </div>
  )
}

export default Comments; // Exporting the Comments component as the default export"use client";