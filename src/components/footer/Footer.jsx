import React from 'react';
import styles from './footer.module.css';
import Image from 'next/image';
import Link from 'next/link';

// Footer component to display the website footer
function Footer() {
  return (
    <div className={styles.container}>
      {/* Info Section: Contains logo, description, and social media icons */}
      <div className={styles.info}>
        {/* Logo and Website Name */}
        <Link href='/' className={styles.logo} shallow>
          <Image src='/logo.png' alt='logo' width={50} height={50} />
          <h1 className={styles.logoText}>The Presso</h1>
        </Link>

        {/* Website Description */}
        <p className={styles.desc}>
          Where imagination soars and ideas come to life. Our blogging platform is not just a venue for sharing insights; it’s a dynamic community of writers, dreamers, innovators, and explorers, united by a passion for storytelling.
        </p>

        {/* Social Media Icons */}
        <div className={styles.icons}>
          <Image src='/facebook.png' alt='facebook' width={18} height={18} />
          <Image src='/instagram.png' alt='instagram' width={18} height={18} />
          <Image src='/linkedin.png' alt='linkedin' width={18} height={18} />
          <Image src='/youtube.png' alt='youtube' width={18} height={18} />
        </div>
      </div>

      {/* Links Section: Contains navigation links, tags, and social media links */}
      <div className={styles.links}>
        {/* Navigation Links */}
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href='/' shallow>Home</Link>
          <Link href='/' shallow>Blogs</Link>
          <Link href='/' shallow>About</Link>
          <Link href='/' shallow>Contact</Link>
        </div>

        {/* Tags Links */}
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href='/blog?cat=technology' shallow>Technology</Link>
          <Link href='/blog?cat=fashion' shallow>Fashion</Link>
          <Link href='/blog?cat=coding' shallow>Coding</Link>
          <Link href='/blog?cat=culture' shallow>Culture</Link>
        </div>

        {/* Social Media Links */}
        <div className={styles.list}>
          <span className={styles.listTitle}>Social</span>
          <Link href='/' shallow>Facebook</Link>
          <Link href='/' shallow>Instagram</Link>
          <Link href='/' shallow>LinkedIn</Link>
          <Link href='/' shallow>Youtube</Link>
        </div>
      </div>
    </div>
  );
}

export default Footer;