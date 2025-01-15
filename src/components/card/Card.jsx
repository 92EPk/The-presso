"use client"; // Indicates that this is a Client Component in Next.js

import React from 'react'; // Importing React library
import styles from './card.module.css'; // Importing CSS module for styling
import Image from 'next/image'; // Importing Next.js Image component for optimized images
import Link from 'next/link'; // Importing Next.js Link component for client-side navigation
import { motion } from 'framer-motion'; // Importing motion from Framer Motion for animations

// Card component definition
function Card({key, item, name}) {
  return (
    // Motion div for animation effects
    <motion.div 
      initial="hidden" // Initial animation state
      whileInView="visible" // Animation state when in view
      viewport={{once:true, amount:0.5}} // Viewport settings: animate only once and when 50% of the element is in view
      transition={{duration:0.5}} // Animation duration
      variants={{
        hidden:{opacity: 0, y: 50}, // Hidden state: opacity 0 and 50px down
        visible:{opacity: 1, y: 0} // Visible state: opacity 1 and original position
      }} 
      className={styles.container} // Applying CSS class from the module
      key={key} // Unique key for the component
    >
      {/* Image container */}
      <div className={styles.imageContainer}>
        {/* Next.js Image component for optimized image rendering */}
        <Image 
          src={item.img} // Image source
          alt='' // Empty alt text (should be filled for accessibility)
          fill // Image fills the container
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw' // Responsive image sizes
          className={styles.image} // Applying CSS class from the module
        />
      </div>

      {/* Text container */}
      <div className={styles.textContainer}>
        {/* Detail section */}
        <div className={styles.detail}>
          {/* Displaying the creation date */}
          <span className={styles.date}>{item.createdAt.substring(0, 10)} -{" "}</span>
          {/* Displaying the category */}
          <span className={styles.category}>{item.catSlug}</span>
          {/* Displaying the author's name */}
          <span style={{color: 'orange'}}> - {item?.user?.name || name}</span>
        </div>

        {/* Link to the post */}
        <Link href={`/posts/${item.slug}`} shallow>
          {/* Post title */}
          <h1>{item.title}</h1>
        </Link>

        {/* Post description */}
        <p 
          className={styles.desc} 
          dangerouslySetInnerHTML={{ __html: item?.desc.substring(0, 170)+'...' }} // Displaying truncated description with ellipsis
        ></p>

        {/* Read More link */}
        <Link className={styles.link} href={`/posts/${item.slug}`} shallow>Read More</Link>
      </div>
    </motion.div>
  )
}

export default Card; // Exporting the Card component as the default export