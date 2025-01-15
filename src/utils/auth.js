import { PrismaAdapter } from "@auth/prisma-adapter"; // Import PrismaAdapter for NextAuth.js
import GithubProvider from "next-auth/providers/github"; // Import GitHub provider for authentication
import GoogleProvider from "next-auth/providers/google"; // Import Google provider for authentication
import prisma from "./connect"; // Import the Prisma client instance
import { getServerSession } from "next-auth"; // Import getServerSession for server-side session management

// Configuration object for NextAuth.js
export const authOptions = {
  adapter: PrismaAdapter(prisma), // Use PrismaAdapter with the Prisma client for database integration
  providers: [
    // Google Provider configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_ID, // Google OAuth client ID from environment variables
      clientSecret: process.env.GOOGLE_SECRET, // Google OAuth client secret from environment variables
    }),
    // GitHub Provider configuration
    GithubProvider({
      clientId: process.env.GITHUB_ID, // GitHub OAuth client ID from environment variables
      clientSecret: process.env.GITHUB_SECRET, // GitHub OAuth client secret from environment variables
    }),
  ],
};

// Function to retrieve the server session using authOptions
export const getAuthSession = () => getServerSession(authOptions);