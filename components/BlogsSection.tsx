"use client";
import { useState } from "react";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import BlogCategories from "@/components/BlogCategories";
import Link from "next/link";

interface BlogsSectionProps {
  initialPosts: any[];
  categories: { id: string; name: string }[];
}

export default function BlogsSection({
  initialPosts,
  categories,
}: BlogsSectionProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Filter posts based on search query and category
  const filteredPosts = initialPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.description &&
        post.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === "" ||
      (post.category &&
        post.category.toLowerCase() === selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search our blogs by topic or keywords..."
      />

      <BlogCategories
        categories={categories}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <section className="blog-grid">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </section>

      <div className="text-center mt-8 mb-12">
        <Link href="/blogs" className="btn btn-primary">
          View All Posts
        </Link>
      </div>
    </div>
  );
}
