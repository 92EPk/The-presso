// Importing necessary components and styles
import Navbar from '@/components/navbar/Navbar'; // Navbar component
import './globals.css'; // Global CSS styles
import { Inter } from 'next/font/google'; // Google font Inter
import Footer from '@/components/footer/Footer'; // Footer component
import { ThemeContextProvider } from '@/context/ThemeContext'; // Theme context provider
import ThemeProvider from '@/providers/ThemeProvider'; // Theme provider
import AuthProvider from '@/providers/AuthProvider'; // Authentication provider
import { WebVitals } from '@/utils/web-vitals'; // Web vitals utility
import { Toaster } from 'react-hot-toast'; // Toast notifications

// Initializing the Inter font with the 'latin' subset
const inter = Inter({ subsets: ['latin'] });

// Metadata for the application
export const metadata = {
  title: 'The Presso', // Title of the application
  description: 'A Place to Express Yourself. One Stop for your Writing and Blogging Passion.', // Description of the application
};

// Default RootLayout component that wraps the entire application
export default function RootLayout({ children }) {
  return (
    // HTML document with language set to English
    <html lang="en">
      <head>
        {/* Preloading the featured image for better performance */}
        <link rel="preload" href="/featured.jpg" as='image' />
      </head>
      {/* Body with Inter font applied */}
      <body className={inter.className}>
        {/* WebVitals utility for performance monitoring */}
        <WebVitals />
        {/* Authentication provider for managing user authentication */}
        <AuthProvider>
          {/* Theme context provider for managing theme state */}
          <ThemeContextProvider>
            {/* Theme provider for applying the selected theme */}
            <ThemeProvider>
              {/* Toast notifications component */}
              <Toaster />
              {/* Main container for the layout */}
              <div className='container'>
                {/* Wrapper for the content */}
                <div className='wrapper'>
                  {/* Navbar component */}
                  <Navbar />
                  {/* Children components (pages) */}
                  {children}
                  {/* Footer component */}
                  <Footer />
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}