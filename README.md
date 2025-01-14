# Next.js Full-Stack Blog Application

Welcome to my Next.js full-stack blog application! This project leverages **Next.js 13** and **MongoDB** to create a feature-rich, responsive web application designed for blogging. 

## Project Overview

This application showcases my skills in building a dynamic web application using modern development practices. It includes various features such as user authentication, data fetching, and responsive design, all integrated seamlessly with a MongoDB backend.

### Features

- Responsive design with a mobile-first approach
- User authentication using Google OAuth
- Dynamic fetching of blog posts and categories
- Pagination functionality for browsing posts
- Image uploads using Firebase
- Dark mode theme toggle
- Comprehensive blog post management

## Technologies Used

- **Next.js**: A React framework for building server-rendered applications.
- **MongoDB**: NoSQL database to store and manage blog data.
- **Prisma**: Powerful ORM for querying the database.
- **Firebase**: For image storage and uploads.
- **CSS**: Styling and layout.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/92EPk/The-presso.git
   ```
2. Navigate into the project directory:
   ```bash
   cd next-blog
   ```
3. Install the required dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables (make sure to create a `.env` file with your configuration):
   ```
   DATABASE_URL=your_mongodb_connection_string
   NEXTAUTH_URL=http://localhost:3000
   GOOGLE_ID=your_google_client_id
   GOOGLE_SECRET=your_google_client_secret
   FIREBASE_KEY=your_firebase_storage_bucket
   ```

### Running the Application

To start the development server, use the following command:
```bash
npm run dev
```
The application will be launched at [http://localhost:3000](http://localhost:3000).

### Project Structure

-   **Root Directory**

    -   `jsconfig.json`: Configuration file for JavaScript projects.
    -   `next.config.js`: Configuration file specific to Next.js to manage the project settings.
    -   `package.json`: The manifest file for npm, includes dependencies and scripts.
    -   `prisma/schema.prisma`: Structure of the database schema for Prisma.
    -   `public/`: Contains static assets like images and icons.
        -   Images used in the project, such as logos and icons for social media.
    -   `src/`: Main source folder containing all application logic and components.
-   **App Directory** (`src/app`)

    -   **API Routes** (`api/`): Handle backend functionalities such as authentication, fetching posts, and comments.

        -   `auth/`: Contains NextAuth.js configuration for handling user authentication.
        -   `posts/`: CRUD operations related to blog posts and fetching specific post details by slug.
        -   `comments/`: API endpoints for managing comments on posts.
        -   `categories/`: Endpoints for managing blog categories.
        -   `featured/`: Endpoints for handling featured posts.
    -   **Pages**: Various pages for the application including writing new posts, viewing specific posts, login, and user author pages.

        -   Each page has its own CSS module for styling.
-   **Components Directory** (`src/components`)

    -   Modular React components representing different UI parts of the application like Navbar, Footer, Post Cards, Category List, and Comments. Using CSS modules for scoped styles.
-   **Context Directory** (`src/context`): Implements React's Context API for managing themes, providing dark/light mode functionality throughout the app.

-   **Providers Directory** (`src/providers`): Houses provider components for authentication and theme.

-   **Utils Directory** (`src/utils`): Utility functions for authentication, database connection, and Firebase integration.

## Future Improvements

- Implement unit and integration testing for components and APIs.
- Enhance user interface with additional features like a comment system.
- Optimize performance and SEO.


## Contact

For any inquiries or collaborations, feel free to reach out:

- **Ahmed Ibrahim** - (b9x@outlook.com)

Thank you for checking out my project!
