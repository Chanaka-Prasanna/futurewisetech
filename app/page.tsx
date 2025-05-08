"use client";
import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import BlogsSection from "@/components/BlogsSection";
import { getLatestBlogPosts, BlogPost } from "@/lib/blog-utils";
import { deleteAllBlogPosts } from "@/utils/delete-blog-posts";
import { seedFirestore } from "@/utils/seed-firestore";
// Categories for filtering
const CATEGORIES = [
  { id: "technology", name: "Technology" },
  { id: "design", name: "Design" },
  { id: "management", name: "Management" },
  { id: "resources", name: "Resources" },
  { id: "customer-success", name: "Customer Success" },
];

export default function HomePage() {
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        setLoading(true);
        const posts = await getLatestBlogPosts(6);
        setLatestPosts(posts);
      } catch (error) {
        console.error("Error fetching latest blog posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestPosts();
  }, []);

  useEffect(() => {
    // deleteAllBlogPosts();
    // seedFirestore();
  }, []);
  return (
    <>
      <Hero />
      {loading ? (
        <div className="container py-12 text-center">
          <p>Loading latest blog posts...</p>
        </div>
      ) : (
        <BlogsSection initialPosts={latestPosts} categories={CATEGORIES} />
      )}
    </>
  );
}
