// Import necessary modules and utilities
import prisma from "@/utils/connect"; // Prisma client for database operations
import { NextResponse } from "next/server"; // Next.js utility for handling responses

// GET SINGLE POST
export const GET = async (req) => {
  try {
    // Fetch the first two posts from the database where the 'editor' field is true
    const posts = await prisma.post.findMany({
      take: 2, // Limit the number of posts fetched to 2
      where: { editor: true }, // Filter posts where the 'editor' field is true
    });

    // Return the fetched posts as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(posts, { status: 200 }));
  } catch (err) {
    // Log the error to the console for debugging purposes
    console.log(err);

    // Return a 500 status code with an error message if something goes wrong
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" + err }, { status: 500 })
    );
  }
};