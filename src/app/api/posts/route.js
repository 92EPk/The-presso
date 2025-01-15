// Importing necessary modules
import { getAuthSession } from "@/utils/auth"; // Utility to get the authenticated session
import prisma from "@/utils/connect"; // Prisma client for database operations
import { NextResponse } from "next/server"; // NextResponse for handling HTTP responses

// GET REQUEST: Fetch posts with pagination and optional category filter
export const GET = async (req) => {
  // Extracting query parameters from the request URL
  const { searchParams } = new URL(req.url);

  // Getting the 'page' and 'cat' (category) query parameters
  const page = searchParams.get("page");
  const cat = searchParams.get("cat");

  // Defining the number of posts to display per page
  const POST_PER_PAGE = 6;

  // Building the query object for fetching posts
  const query = {
    take: POST_PER_PAGE, // Number of posts to fetch
    skip: POST_PER_PAGE * (page - 1), // Number of posts to skip for pagination
    where: {
      ...(cat && { catSlug: cat }), // Filter by category if provided
    },
    orderBy: {
      createdAt: "desc", // Order posts by creation date in descending order
    },
    include: { user: true }, // Include related user data in the response
  };

  try {
    // Using Prisma's transaction to fetch posts and count total posts in parallel
    const [posts, count] = await prisma.$transaction([
      prisma.post.findMany(query), // Fetch posts based on the query
      prisma.post.count({ where: query.where }), // Count total posts matching the query
    ]);

    // Returning the fetched posts and count as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify({ posts, count }, { status: 200 }));
  } catch (err) {
    // Logging the error to the console for debugging purposes
    console.log(err);

    // Returning an error response with a 500 status code and an error message
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// POST REQUEST: Create a new post
export const POST = async (req) => {
  // Fetching the authenticated session
  const session = await getAuthSession();

  // If no session is found, return a 401 Unauthorized response
  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
    );
  }

  try {
    // Parsing the request body to get post data
    const body = await req.json();

    // Creating a new post in the database with the authenticated user's email
    const post = await prisma.post.create({
      data: { ...body, userEmail: session.user.email },
    });

    // Returning the created post as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(post, { status: 200 }));
  } catch (err) {
    // Logging the error to the console for debugging purposes
    console.log(err);

    // Returning an error response with a 500 status code and an error message
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};