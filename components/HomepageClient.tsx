"use client";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import BlogCategories from "@/components/BlogCategories";
import Link from "next/link";
import { useState } from "react";

const CATEGORIES = [
  { id: "learning", name: "Learning" },
  { id: "news", name: "News" },
  { id: "insights", name: "Insights" },
];

interface HomepageClientProps {
  initialPosts: any[];
}

export default function HomepageClient({ initialPosts }: HomepageClientProps) {
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
        categories={CATEGORIES}
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
