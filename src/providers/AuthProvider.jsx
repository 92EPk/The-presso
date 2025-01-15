"use client"; // Marks this as a Client Component in Next.js
import React from 'react';
import { SessionProvider } from 'next-auth/react'; // Import SessionProvider from next-auth/react

// AuthProvider component to wrap the application with session management
const AuthProvider = ({ children }) => {
  return (
    // Wrap the children with SessionProvider to enable session management
    <SessionProvider>
      {children}
    </SessionProvider>
  );
};

export default AuthProvider;