"use client";
import React, { Suspense, useEffect, useState } from 'react'
import styles from './writePage.module.css';
import Image from 'next/image';
import "react-quill/dist/quill.snow.css";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
import { app } from '@/utils/firebase';
import dynamic from 'next/dynamic';
import Loader from '@/components/loader/Loader';
import CategoriesOptions from '@/components/categoriesOptions/CategoriesOptions';
import toast from 'react-hot-toast';
import AddCategory from '@/components/addCategory/AddCategory';

// Define the toolbar options for the ReactQuill editor
const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline','strike'],
      ['blockquote', 'code-block'],

      [{ 'header': 1 }, { 'header': 2 }],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      [{ 'direction': 'rtl' }],

      [{ 'background': [] }],        
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean']
    ]
  }

// Define the formats supported by the ReactQuill editor
 const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'blockquote', 'code-block',
    'header',
    'list', 'bullet', 'indent',
    'direction',
    'background',
    'align',
    'link', 'image', 'video',
  ];
  

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'),{ssr: false});

// Main WritePage component
const WritePage = () => {
    const { status } = useSession(); // Get the authentication status
    const router = useRouter(); // Router for navigation

    // State variables
    const [file, setFile] = useState(null); // File to be uploaded
    const [media, setMedia] = useState(""); // URL of the uploaded media
    const [open, setOpen] = useState(false); // Toggle for the add media menu
    const [value, setValue] = useState(""); // Content of the editor
    const [title, setTitle] = useState(""); // Title of the post
    const [catSlug, setCatSlug] = useState(""); // Selected category slug

    // Effect to handle file upload to Firebase Storage
    useEffect(() => {
        const storage = getStorage(app);
        const upload = () => {
            const name = new Date().getTime() + file.name; // Generate a unique file name
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log("Upload is " + progress + "% done");
                switch (snapshot.state) {
                    case "paused":
                    console.log("Upload is paused");
                    break;
                    case "running":
                    console.log("Upload is running");
                    break;
                }
                },
                (error) => {},
                () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setMedia(downloadURL); // Set the download URL after upload is complete
                });
                }
            );
        }

        file && upload(); // Upload the file if it exists
    }, [file])

    // Redirect if the user is unauthenticated
    if(status === "loading"){
        return <div className={styles.loading}>Loading...</div>
    }
    if(status === "unauthenticated"){
        router.push("/");
    }

    // Function to create a slug from the title
    const slugify = (str) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Function to handle form submission
    const handleSubmit = async () => {
        const res = await fetch("/api/posts", {
        method: "POST",
 body: JSON.stringify({
            title,
            desc: value,
            img: media,
            slug: slugify(title),
            catSlug: catSlug || "style", // Default category if none selected
        }),
        });

        if (res.status === 200) {
            const data = await res.json();
            router.push(`/posts/${data.slug}`); // Redirect to the new post
        }
    };

    // Render the WritePage component
    return (
        <Suspense fallback={<Loader />}>
            <div className={styles.container}>
                <input 
                    type="text" 
                    placeholder='Title' 
                    className={styles.input} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                
                <AddCategory setCatSlug={setCatSlug} /> {/* Component to add category */}
                
                <div className={styles.editor}>
                    <div>
                        <button className={styles.button} onClick={() => setOpen(!open)}>
                            <Image src='/plus.png' alt='' width={16} height={16} />
                        </button>
                        {open && (
                            <div className={styles.add}>
                                <input
                                    type="file"
                                    id="image"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                                <button title='Add Featured Image' className={styles.addButton}>
                                    <label htmlFor="image" style={{cursor: "pointer"}}>
                                        <Image src='/image.png' alt='' width={16} height={16} />
                                    </label>
                                </button>
                                <button className={styles.addButton}>
                                    <Image src='/external.png' alt='' width={16} height={16} />
                                </button>
                                <button className={styles.addButton}>
                                    <Image src='/video.png' alt='' width={16} height={16} />
                                </button>
                            </div>
                        )}
                    </div>
                    <ReactQuill 
                        className={styles.descArea} 
                        theme='snow' 
                        modules={modules} 
                        formats={formats} 
                        value={value} 
                        onChange={setValue} 
                        placeholder='Tell your story...' 
                    />
                </div>

                <button className={styles.publish} onClick={handleSubmit}>Publish</button>
            </div>
        </Suspense>
    )
}

export default WritePage