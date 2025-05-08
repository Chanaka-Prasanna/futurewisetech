/**
 * Admin utility script to seed Firestore with sample blog posts
 * Run with: node utils/admin-seed-firestore.js
 *
 * This script uses Firebase Admin SDK which bypasses security rules
 */

// Import Firebase Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-service-account-key.json"); // You need to download this from Firebase console

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

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
async function seedFirestore() {
  try {
    console.log("Adding sample blog posts to Firestore...");

    const postsCollection = db.collection("blog-posts");

    // Add each post to the collection
    for (const post of samplePosts) {
      const docRef = await postsCollection.add(post);
      console.log(`Added post with ID: ${docRef.id}`);

      // Update the document to include its ID in the data
      await postsCollection.doc(docRef.id).update({
        id: docRef.id,
      });
    }

    console.log("Successfully added all sample blog posts!");
    process.exit(0);
  } catch (error) {
    console.error("Error adding sample posts:", error);
    process.exit(1);
  }
}

// Run the seed function
seedFirestore();
