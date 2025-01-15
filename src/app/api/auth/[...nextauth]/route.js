// Import the authentication options from the auth utility file
import { authOptions } from "@/utils/auth";

// Import NextAuth for handling authentication
import NextAuth from "next-auth";

// Create a NextAuth handler using the imported authentication options
const handler = NextAuth(authOptions);

// Export the handler as both GET and POST methods for API route handling
export { handler as GET, handler as POST };