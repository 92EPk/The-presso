// Import necessary modules and utilities
import { getAuthSession } from "@/utils/auth"; // Utility to get the authentication session
import prisma from "@/utils/connect"; // Prisma client for database operations
import { NextResponse } from "next/server"; // Next.js utility for handling responses

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  // Extract query parameters from the request URL
  const { searchParams } = new URL(req.url);

  // Get the postSlug from the query parameters
  const postSlug = searchParams.get("postSlug");

  try {
    // Fetch comments from the database using Prisma
    const comments = await prisma.comment.findMany({
      where: {
        // Filter comments by postSlug if it is provided
        ...(postSlug && { postSlug }),
      },
      // Include the associated user data in the response
      include: { user: true },
    });

    // Return the comments as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(comments, { status: 200 }));
  } catch (err) {
    // Log the error (commented out for now)
    // console.log(err);

    // Return a 500 status code with an error message if something goes wrong
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  // Get the authentication session to check if the user is authenticated
  const session = await getAuthSession();

  // If there is no session, return a 401 status code with an error message
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    // Parse the request body to get the comment data
    const body = await req.json();

    // Create a new comment in the database using Prisma
    const comment = await prisma.comment.create({
      data: {
        // Spread the body data and add the user's email from the session
        ...body,
        userEmail: session.user.email,
      },
    });

    // Return the newly created comment as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(comment, { status: 200 }));
  } catch (err) {
    // Log the error to the console
    console.log(err);

    // Return a 500 status code with an error message if something goes wrong
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};