// Import necessary modules and utilities
import { getAuthSession } from "@/utils/auth"; // Utility to get authentication session
import prisma from "@/utils/connect"; // Prisma client for database operations
import { NextResponse } from "next/server"; // Next.js utility for handling responses

// GET request handler to fetch all categories
export const GET = async () => {
  try {
    // Fetch all categories from the database using Prisma
    const categories = await prisma.category.findMany();

    // Return the categories as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (err) {
    // Log any errors that occur during the process
    console.log(err);
    // Return a 500 status code with an error message if something goes wrong
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

// POST request handler to create a new category
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
    // Parse the request body to get the slug, title, and img
    const { slug, title, img } = await req.json();

    // Check if a category with the same slug already exists
    const existance = await prisma.category.count({
      where: { slug: slug },
    });

    // If a category with the same slug exists, return a 402 status code with an error message
    if (existance > 0) {
      return NextResponse.json(
        { message: "Already Exist" },
        { status: 402 }
      );
    }

    // Create a new category in the database using Prisma
    const category = await prisma.category.create({
      data: { slug, title, img },
    });

    // Return the newly created category as a JSON response with a 200 status code
    return new NextResponse(JSON.stringify(category, { status: 200 }));
  } catch (error) {
    // Log any errors that occur during the process
    console.log(error);
    // Return a 500 status code with an error message if something goes wrong
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};