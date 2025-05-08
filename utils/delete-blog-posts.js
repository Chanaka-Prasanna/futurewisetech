/**
 * Utility script to delete all blog posts from Firestore
 * Run with: node utils/delete-blog-posts.js
 */

// Import Firebase modules
const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  doc,
  writeBatch,
} = require("firebase/firestore");

// Firebase configuration - use environment variables
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

/**
 * Delete all blog posts from Firestore
 */
export async function deleteAllBlogPosts() {
  try {
    console.log("Fetching all blog posts from Firestore...");
    const postsCollection = collection(db, "blog-posts");
    const postsSnapshot = await getDocs(postsCollection);

    if (postsSnapshot.empty) {
      console.log("No blog posts found to delete.");
      return;
    }

    console.log(`Found ${postsSnapshot.size} blog posts to delete.`);

    // Method 1: Delete documents one by one
    for (const document of postsSnapshot.docs) {
      await deleteDoc(doc(db, "blog-posts", document.id));
      console.log(`Deleted blog post with ID: ${document.id}`);
    }

    /* 
    // Method 2: Using batch writes (uncomment if you prefer batch deletion)
    // Note: Firestore batches are limited to 500 operations
    const batch = writeBatch(db);
    
    for (const document of postsSnapshot.docs) {
      batch.delete(doc(db, "blog-posts", document.id));
    }
    
    await batch.commit();
    console.log(`Deleted ${postsSnapshot.size} blog posts in batch.`);
    */

    console.log("Successfully deleted all blog posts!");
  } catch (error) {
    console.error("Error deleting blog posts:", error);
  }
}

// Run the delete function
