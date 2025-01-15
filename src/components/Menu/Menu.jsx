import React from 'react';
import styles from './menu.module.css';
import MenuPosts from '../menuPosts/MenuPosts';
import MenuCategories from '../menuCategories/MenuCategories';
import MenuPopular from '../menuPopular/MenuPopular';

// Menu component to display a sidebar with popular posts, categories, and editor's picks
function Menu() {
  return (
    // Main container for the menu
    <div className={styles.container}>
      {/* Section for "Most Popular" posts */}
      <h2 className={styles.subtitle}>What&apos;s Hot</h2>
      <h1 className={styles.title}>Most Popular</h1>
      <MenuPopular /> {/* Renders the most popular posts */}

      {/* Sidebar section containing categories and editor's picks */}
      <div className={styles.sidebar}>
        {/* Section for "Categories" */}
        <h2 className={styles.subtitle}>Discover by topic</h2>
        <h1 className={styles.title}>Categories</h1>
        <MenuCategories /> {/* Renders the categories */}

        {/* Section for "Editor's Pick" posts */}
        <h2 className={styles.subtitle}>Chosen by the editor</h2>
        <h1 className={styles.title}>Editor&apos;s Pick</h1>
        <MenuPosts /> {/* Renders the editor's pick posts */}
      </div>
    </div>
  );
}

export default Menu;