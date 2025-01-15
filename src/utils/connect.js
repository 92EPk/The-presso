import { PrismaClient } from '@prisma/client'; // Import PrismaClient from the Prisma package

// Initialize a global Prisma client instance to avoid multiple instances in development
let prisma;

// Check if the environment is production
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient(); // Create a new Prisma client instance in production
} else {
  // In development, reuse the existing Prisma client instance stored in the global object
  if (!global.prisma) {
    global.prisma = new PrismaClient(); // Create a new Prisma client instance if it doesn't exist
  }
  prisma = global.prisma; // Use the existing Prisma client instance
}

export default prisma; // Export the Prisma client instance for use in the application