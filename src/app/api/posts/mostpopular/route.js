// Importing necessary modules
import prisma from "@/utils/connect"; // Importing Prisma client for database operations
import { NextResponse } from "next/server"; // Importing NextResponse for handling HTTP responses

// GET SINGLE POST
export const GET = async (req) => {
    try {
        // Fetching the top 3 most viewed posts from the database
        const posts = await prisma.post.findMany({
            take: 3, // Limit the number of posts to 3
            orderBy: { views: 'desc' } // Order posts by views in descending order
        });

        // Returning the fetched posts as a JSON response with a 200 status code
        return new NextResponse(JSON.stringify(posts, { status: 200 }));
    } catch (err) {
        // Logging the error to the console for debugging purposes
        console.log(err);

        // Returning an error response with a 500 status code and an error message
        return new NextResponse(
            JSON.stringify({ message: "Something went wrong!" + err }, { status: 500 })
        );
    }
};