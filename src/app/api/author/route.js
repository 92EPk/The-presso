// Import the getAuthSession utility to retrieve the current authenticated session
import { getAuthSession } from "@/utils/auth";

// Import the Prisma client for database operations
import prisma from "@/utils/connect";

// Import NextResponse for creating HTTP responses in Next.js API routes
import { NextResponse } from "next/server";

// Define a GET request handler for the API route
export const GET = async (req) => {
    // Extract query parameters from the request URL
    const { searchParams } = new URL(req.url);
    
    // Retrieve the 'postId' query parameter from the URL
    const postId = searchParams.get("postId");

    try {
        // Fetch the post with the specified postId from the database
        const post = await prisma.post.findFirst({
            where: {
                id: postId, // Filter by the provided postId
            },
        });

        // Fetch all posts by the same user (using the email from the retrieved post)
        const posts = await prisma.post.findMany({
            where: {
                userEmail: post.userEmail, // Filter by the user's email
            },
            orderBy: {
                createdAt: 'desc', // Sort posts by creation date in descending order
            },
        });

        // Return the list of posts as a JSON response with a 200 status code
        return new NextResponse(JSON.stringify(posts, { status: 200 }));
    } catch (error) {
        // Log any errors that occur during the process
        console.log(error);

        // Return a 500 status code with an error message if something goes wrong
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
        );
    }
};