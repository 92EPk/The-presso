// Importing necessary components and styles
import Featured from "@/components/featured/Featured"; // Featured section component
import styles from "./homepage.module.css"; // CSS module for styling the homepage
import CategoryList from "@/components/categoryList/CategoryList"; // Category list component
import CardList from "@/components/cardList/CardList"; // Card list component
import Menu from "@/components/Menu/Menu"; // Menu component
import { Suspense } from "react"; // React's Suspense for lazy loading
import Loader from "@/components/loader/Loader"; // Loader component for fallback UI

// Default Home component that takes `searchParams` as a prop
export default function Home({ searchParams }) {

  // Extracting the `page` parameter from `searchParams` and defaulting to 1 if not provided
  const page = parseInt(searchParams.page) || 1;

  return (
    // Main container with styles applied
    <div className={styles.container}>
      {/* Suspense wrapper to handle lazy loading with a fallback Loader component */}
      <Suspense fallback={<Loader />}>
        {/* Featured section */}
        <Featured />
        {/* Category list section */}
        <CategoryList />
        {/* Content section with styles applied */}
        <div className={styles.content}>
          {/* Card list section with the current page passed as a prop */}
          <CardList page={page} />
          {/* Menu section */}
          <Menu />
        </div>
      </Suspense>
    </div>
  );
}