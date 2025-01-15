"use client";
import React, { useEffect, useState } from 'react';
import styles from './addCategory.module.css';
import toast from 'react-hot-toast';

// AddCategory component that allows users to add a new category or select an existing one
const AddCategory = ({ setCatSlug }) => {
    // State to store the new category name
    const [newCat, setNewCat] = useState("");
    // State to store the list of existing categories
    const [catList, setCatList] = useState([]);

    // Function to fetch the list of categories from the API
    const getData = async () => {
        return await fetch('/api/categories')
            .then((res) => res.json()) // Parse the response as JSON
            .then((d) => d.sort(function (a, b) {
                // Sort the categories alphabetically by title
                return (a.title > b.title) - (a.title < b.title);
            }))
            .then((data) => setCatList(data)); // Update the state with the sorted categories
    }

    // Function to convert a string into a URL-friendly slug
    const slugify = (str) =>
        str
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "") // Remove special characters
            .replace(/[\s_-]+/g, "-") // Replace spaces and underscores with hyphens
            .replace(/^-+|-+$/g, ""); // Remove leading and trailing hyphens

    // Function to handle adding a new category
    const handleAddCategory = async () => {
        // Send a POST request to the API to add the new category
        const res = await fetch("/api/categories", {
            method: "POST",
            body: JSON.stringify({
                slug: slugify(newCat), // Generate a slug from the new category name
                title: newCat, // Use the new category name as the title
                img: '/technology.png' // Default image for the category
            }),
        });

        // Handle the response
        if (res.status === 402) {
            toast.error("Category already exists"); // Show an error if the category already exists
        }

        if (res.status === 200) {
            setNewCat(""); // Clear the input field
            const data = await res.json(); // Parse the response as JSON
            console.log(data); // Log the response data
            toast.success("Category Created"); // Show a success message
        }
    }

    // Effect to fetch the list of categories when the component mounts or when catList changes
    useEffect(() => {
        getData();
    }, [catList]);

    // Render the component
    return (
        <div className={styles.selectCategory}>
            {/* Dropdown to select an existing category */}
            <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
                <option value="">Category</option>
                {/* Map through the list of categories and render them as options */}
                {
                    catList?.map((category) => (
                        <option key={category.id} value={category.slug}>{category.title}</option>
                    ))
                }
            </select>
            <p>OR</p>
            {/* Input field to add a new category */}
            <input type='text' placeholder='Add Category' value={newCat} onChange={(e) => { setNewCat(e.target.value) }} />
            {/* Button to trigger the add category function */}
            <button onClick={handleAddCategory}>Add</button>
        </div>
    )
}

export default AddCategory