// Import necessary modules and components
import React, { Suspense } from 'react';
import styles from './singlePage.module.css';
import Menu from '@/components/Menu/Menu';
import Image from 'next/image';
import Comments from '@/components/comments/Comments';
import Loader from '@/components/loader/Loader';
import Link from 'next/link';

// Function to fetch data from the API based on the slug
const getData = async (slug) => {
    const res = await fetch(`${process.env.URL}/api/posts/${slug}`,{
      cache: "no-store" // Ensure no caching to get fresh data
    });
  
    // Check if the response is not OK and throw an error if it fails
    if(!res.ok){
      throw new Error("Failed")
    }
  
    // Return the parsed JSON data
    return res.json();
  }

// Main SinglePage component that takes params as props
const SinglePage = async ({params}) => {

    // Destructure the slug from params
    const { slug } = params;
    
    // Fetch data using the getData function with the slug
    const data = await getData(slug);

  // Return the JSX for the SinglePage
  return (
    // Use Suspense to show a fallback Loader while data is being fetched
    <Suspense fallback={<Loader />}>
    <div className={styles.container}>
        <div className={styles.infoContainer}>
            <div className={styles.textContainer}>
                {/* Display the post title */}
                <h1 className={styles.title}>{data?.title}</h1>
                <div className={styles.user}>
                    {/* Display the user's image if available */}
                    {data?.user?.image && (
                        <div className={styles.userImageContainer}>
                            <Image src={data.user.image} alt='' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className={styles.avatar} priority />
                        </div>
                    )}
                    
                    <div className={styles.userTextContainer}>
                        {/* Link to the author's page */}
                        <Link href={`/author?name=${data?.user?.name}&postId=${data?.id}`} shallow>
                            <span className={styles.username}>{data?.user?.name}</span>
                        </Link>
                        
                        {/* Display the post creation date */}
                        <span className={styles.date}>{data?.createdAt.substring(0, 10)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.imageContainer}>
                {/* Display the post image */}
                <Image src={data?.img} alt='' fill sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' className={styles.image} />
            </div>
        </div>

        <div className={styles.content}>
            <div className={styles.post}>
                {/* Display the post description using dangerouslySetInnerHTML */}
                <div className={styles.description} dangerouslySetInnerHTML={{ __html: data?.desc }}></div>

                <div className={styles.comment}>
                    {/* Render the Comments component with the post slug */}
                    <Comments postSlug={slug} />
                </div>
            </div>

            {/* Render the Menu component */}
            <Menu />
        </div>
    </div>
    </Suspense>
  )
}

// Export the SinglePage component as the default export
export default SinglePage