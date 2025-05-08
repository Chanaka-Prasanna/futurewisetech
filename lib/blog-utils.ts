import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface BlogPost {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  date: string | number;
  category?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readTime?: string;
  content?: string;
  [key: string]: any;
}

/**
 * Fetches the latest blog posts from Firestore
 * @param count Number of posts to fetch
 * @returns Array of blog posts
 */
export async function getLatestBlogPosts(count = 6) {
  try {
    const postsQuery = query(
      collection(db, "blog-posts"),
      orderBy("date", "desc"),
      limit(count)
    );

    const postsSnapshot = await getDocs(postsQuery);

    return postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];
  } catch (error) {
    console.error("Error fetching latest blog posts:", error);
    return [];
  }
}

/**
 * Fetches a single blog post by ID
 * @param id Blog post ID
 * @returns Blog post or null if not found
 */
export async function getBlogPostById(id: string) {
  try {
    const postDoc = await getDoc(doc(db, "blog-posts", id));

    if (postDoc.exists()) {
      return {
        id: postDoc.id,
        ...postDoc.data(),
      } as BlogPost;
    }

    return null;
  } catch (error) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return null;
  }
}

/**
 * Fetches a page of blog posts with pagination
 * @param postsPerPage Number of posts per page
 * @param lastVisible Last document for pagination (optional)
 * @returns Object containing posts array, last visible document, and whether there are more posts
 */
export async function getPaginatedBlogPosts(
  postsPerPage = 20,
  lastVisible = null
) {
  try {
    let postsQuery;

    if (lastVisible) {
      postsQuery = query(
        collection(db, "blog-posts"),
        orderBy("date", "desc"),
        startAfter(lastVisible),
        limit(postsPerPage)
      );
    } else {
      postsQuery = query(
        collection(db, "blog-posts"),
        orderBy("date", "desc"),
        limit(postsPerPage)
      );
    }

    const postsSnapshot = await getDocs(postsQuery);

    // Check if we have more posts to load
    const hasMore = postsSnapshot.docs.length === postsPerPage;

    // Get the last visible document for pagination
    const newLastVisible =
      postsSnapshot.docs.length > 0
        ? postsSnapshot.docs[postsSnapshot.docs.length - 1]
        : null;

    const posts = postsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as BlogPost[];

    return {
      posts,
      lastVisible: newLastVisible,
      hasMore,
    };
  } catch (error) {
    console.error("Error fetching paginated blog posts:", error);
    return {
      posts: [],
      lastVisible: null,
      hasMore: false,
    };
  }
}
