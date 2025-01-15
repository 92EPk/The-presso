// Import necessary modules and components
"use client";
import React, { Suspense } from 'react'
import styles from './loginPage.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/loader/Loader';

// Main LoginPage component
const LoginPage = () => {

  // Use the useSession hook to get session data and status
  const {data,status} = useSession();
  
  // Use the useRouter hook for navigation
  const router = useRouter();
  
  // If the session status is "loading", show a loading message
  if(status === "loading"){
    return <div className={styles.loading}>Loading...</div>
  }
  
  // If the user is authenticated, redirect to the home page
  if(status === "authenticated"){
    router.push("/");
  }

  // Return the JSX for the LoginPage
  return (
    // Use Suspense to show a fallback Loader while content is being loaded
    <Suspense fallback={<Loader />}>
      <div className={styles.container}>
        <div className={styles.wrapper}>
            {/* Button to sign in with Google */}
            <div className={styles.socialButton} onClick={() => signIn("google")}>Sign in with Google</div>
            
            {/* Button to sign in with GitHub */}
            <div className={styles.socialButton} onClick={() => signIn("github")}>Sign in with Github</div>
        </div>
      </div>
    </Suspense>
  )
}

// Export the LoginPage component as the default export
export default LoginPage