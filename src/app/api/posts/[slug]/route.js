// Import necessary modules and utilities
import prisma from "@/utils/connect"; // Prisma client for database operations
import { NextResponse } from "next/server"; // Next.js utility for handling responses

// GET SINGLE POST
export const GET = async (req, { params }) => {
  // Extract the 'slug' parameter from the request URL
  const { slug } = params;

  try {
    // Update the post's view count and fetch the post data using Prisma
    const post = await prisma.post.update({
      where: { slug }, // Find the post by its slug
      data: { views: { increment: 1 } }, // Increment the post's view count by 1
      include: { user: true }, // Include the associated user data in the response
    });

    // Return the updated post as a JSON response with a 200 status code
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