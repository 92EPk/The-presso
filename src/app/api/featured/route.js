// Import necessary modules and utilities
import prisma from "@/utils/connect"; // Prisma client for database operations
import { NextResponse } from "next/server"; // Next.js utility for handling responses

// GET SINGLE POST
export const GET = async (req) => {
  try {
    // Fetch the first featured post from the database using Prisma
    const post = await prisma.post.findFirst({
      where: { featured: true }, // Filter posts where the 'featured' field is true
    });

    // Return the fetched post as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    // Log the error to the console for debugging purposes
    console.log(err);

    // Return a 500 status code with an error message if something goes wrong
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};