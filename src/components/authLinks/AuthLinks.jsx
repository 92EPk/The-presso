"use client";
import React, { useState } from 'react'
import styles from './authLinks.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

function AuthLinks() {

  // State to manage the visibility of the responsive menu
  const [open, setOpen] = useState(false);

  // Get the authentication status using the useSession hook
  const { status } = useSession();

  return (
    <>
      {
        // Check if the user is unauthenticated
        status === "unauthenticated" ? (
          // Display the Login link if unauthenticated
          <Link href='/login' className={styles.link}>Login</Link>
        ):(
          // Display Write and Logout links if authenticated
          <>
            <Link href='/write'>Write</Link>
            <span className={styles.link} onClick={signOut}>Logout</span>
          </>
        )
      }

      {/* Burger menu icon to toggle the responsive menu */}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>

      {/* Responsive menu that appears when the burger icon is clicked */}
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href='/'>Home</Link>
          <Link href='/'>About</Link>
          <Link href='/'>Contact</Link>
          {
            // Check if the user is unauthenticated
            status === "notauthenticated" ? (
              // Display the Login link in the responsive menu if unauthenticated
              <Link href='/login'>Login</Link>
            ):(
              // Display Write and Logout links in the responsive menu if authenticated
              <>
                <Link href='/write'>Write</Link>
                <span className={styles.link}>Logout</span>
              </>
            )
          }
        </div>
      )}
    </>
  )
}

export default AuthLinks