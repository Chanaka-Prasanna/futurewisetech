/**
 * Admin utility script to delete all blog posts from Firestore
 * Run with: node utils/admin-delete-blog-posts.js
 *
 * This script uses Firebase Admin SDK
 */

// Import Firebase Admin SDK
const admin = require("firebase-admin");
const serviceAccount = require("../firebase-service-account-key.json"); // You need to download this from Firebase console

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/**
 * Delete all blog posts from Firestore using Admin SDK
 */
async function deleteAllBlogPostsAdmin() {
  try {
    console.log("Fetching all blog posts from Firestore...");
    const postsCollection = db.collection("blog-posts");
    const postsSnapshot = await postsCollection.get();

    if (postsSnapshot.empty) {
      console.log("No blog posts found to delete.");
      process.exit(0);
      return;
    }

    console.log(`Found ${postsSnapshot.size} blog posts to delete.`);

    // Method 1: Delete documents one by one
    for (const document of postsSnapshot.docs) {
      await postsCollection.doc(document.id).delete();
      console.log(`Deleted blog post with ID: ${document.id}`);
    }

    /* 
    // Method 2: Using batch writes (uncomment if you prefer batch deletion)
    // Note: Firestore batches are limited to 500 operations
    const batch = db.batch();
    
    for (const document of postsSnapshot.docs) {
      batch.delete(postsCollection.doc(document.id));
    }
    
    await batch.commit();
    console.log(`Deleted ${postsSnapshot.size} blog posts in batch.`);
    */

    console.log("Successfully deleted all blog posts!");
    process.exit(0);
  } catch (error) {
    console.error("Error deleting blog posts:", error);
    process.exit(1);
  }
}

// Run the delete function
deleteAllBlogPostsAdmin();
