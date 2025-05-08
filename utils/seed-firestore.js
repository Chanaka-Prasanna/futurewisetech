/**
 * Utility script to seed Firestore with sample blog posts
 * Run with: node utils/seed-firestore.js
 */

// Import Firebase modules
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  addDoc,
  setDoc,
  doc,
} = require("firebase/firestore");

// Firebase configuration - replace with your own config or use environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample blog posts data
const samplePosts = [
  {
    title: "Getting Started with Next.js and Firebase",
    description:
      "Learn how to build modern web applications with Next.js and Firebase",
    coverImage:
      "https://placehold.co/600x400/2563eb/white?text=Next.js+Firebase",
    date: new Date().toISOString(),
    category: "Technology",
    author: {
      name: "John Doe",
      avatar: "https://placehold.co/100x100/gray/white?text=JD",
    },
    readTime: "5 min read",
  },
  {
    title: "Designing User-Friendly Interfaces",
    description:
      "Best practices for creating intuitive and accessible user interfaces",
    coverImage: "https://placehold.co/600x400/059669/white?text=UI+Design",
    date: new Date().toISOString(),
    category: "Design",
    author: {
      name: "Jane Smith",
      avatar: "https://placehold.co/100x100/gray/white?text=JS",
    },
    readTime: "7 min read",
  },
  {
    title: "Project Management Methodologies",
    description:
      "Compare different project management approaches for software development",
    coverImage: "https://placehold.co/600x400/d97706/white?text=Management",
    date: new Date().toISOString(),
    category: "Management",
    author: {
      name: "Alex Johnson",
      avatar: "https://placehold.co/100x100/gray/white?text=AJ",
    },
    readTime: "10 min read",
  },
  {
    title: "Essential Developer Resources",
    description:
      "A curated list of tools, libraries, and resources for developers",
    coverImage: "https://placehold.co/600x400/7c3aed/white?text=Resources",
    date: new Date().toISOString(),
    category: "Resources",
    author: {
      name: "Michael Brown",
      avatar: "https://placehold.co/100x100/gray/white?text=MB",
    },
    readTime: "6 min read",
  },
  {
    title: "Building Customer Loyalty",
    description: "Strategies for improving customer satisfaction and retention",
    coverImage: "https://placehold.co/600x400/dc2626/white?text=Customers",
    date: new Date().toISOString(),
    category: "Customer Success",
    author: {
      name: "Sarah Wilson",
      avatar: "https://placehold.co/100x100/gray/white?text=SW",
    },
    readTime: "8 min read",
  },
];

/**
 * Add sample blog posts to Firestore
 */
export async function seedFirestore() {
  try {
    console.log("Adding sample blog posts to Firestore...");

    const postsCollection = collection(db, "blog-posts");

    // Add each post to the collection
    for (const post of samplePosts) {
      const docRef = await addDoc(postsCollection, post);
      console.log(`Added post with ID: ${docRef.id}`);

      // Update the document to include its ID in the data
      await setDoc(doc(db, "blog-posts", docRef.id), {
        id: docRef.id,
        ...post,
      });
    }

    console.log("Successfully added all sample blog posts!");
  } catch (error) {
    console.error("Error adding sample posts:", error);
  }
}

// Run the seed function
