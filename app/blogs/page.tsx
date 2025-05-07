"use client";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import BlogCategories from "@/components/BlogCategories";

// Static data for initial rendering
const STATIC_POSTS = [
  {
    id: "impact-of-technology",
    title:
      "The Impact of Technology on the Workplace: How Technology is Changing",
    description:
      "Explore how modern technology is transforming work environments and business processes.",
    coverImage: "/images/tech-workplace.jpg",
    date: "2023-06-20",
    category: "Technology",
    author: {
      name: "Tracey Wilson",
      avatar: "/images/avatars/tracey.jpg",
    },
    readTime: "13 min read",
  },
  {
    id: "leadership-lessons",
    title: "Bill Walsh leadership lessons",
    description:
      "Learn the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty!",
    coverImage: "/images/leadership.jpg",
    date: "2023-06-19",
    category: "Management",
    author: {
      name: "Deanna Geidt",
      avatar: "/images/avatars/deanna.jpg",
    },
    readTime: "10 min read",
  },
  {
    id: "grid-system-design",
    title: "Grid system for better Design User Interface",
    description:
      "A grid system to help designers layout and arrange content on a website.",
    coverImage: "/images/grid-design.jpg",
    date: "2023-06-18",
    category: "Design",
    author: {
      name: "Erik Selle",
      avatar: "/images/avatars/erik.jpg",
    },
    readTime: "5 min read",
  },
  {
    id: "business-tools",
    title: "7 critical business tools every designer needs!",
    description:
      "Discover a list of the most important business tools for designers to scale their brands to 6 figures and beyond.",
    coverImage: "/images/designer-tools.jpg",
    date: "2023-06-18",
    category: "Resources",
    author: {
      name: "Carter Bentley",
      avatar: "/images/avatars/carter.jpg",
    },
    readTime: "8 min read",
  },
  {
    id: "web-designers-proxy",
    title: "5 reasons why web designers should use proxy",
    description:
      "What are proxy servers and why are web designers using them to improve your web design process?",
    coverImage: "/images/web-proxy.jpg",
    date: "2023-05-16",
    category: "Technology",
    author: {
      name: "Emmy Toft",
      avatar: "/images/avatars/emmy.jpg",
    },
    readTime: "5 min read",
  },
  {
    id: "creative-computing",
    title: "Designers explore the creative possibilities of spatial computing",
    description:
      "Apple's Vision Pro and Meta's Quest are opening the way we interact with technology in space.",
    coverImage: "/images/spatial-computing.jpg",
    date: "2023-05-11",
    category: "Design",
    author: {
      name: "Cooper Carlson",
      avatar: "/images/avatars/cooper.jpg",
    },
    readTime: "20 min read",
  },
  {
    id: "landing-page-mistakes",
    title: "Avoid these 7 mistakes when designing a landing page",
    description:
      "Designing an effective landing page that converts is not easy. In this post, we'll highlight the mistakes you should avoid.",
    coverImage: "/images/landing-page.jpg",
    date: "2023-05-03",
    category: "Resources",
    author: {
      name: "Jessie Mortensen",
      avatar: "/images/avatars/jessie.jpg",
    },
    readTime: "8 min read",
  },
  {
    id: "api-stack",
    title: "Building your API Stack",
    description:
      "Make use of RESTful APIs that team has built for creating, testing, and deploying applications.",
    coverImage: "/images/api-stack.jpg",
    date: "2023-04-22",
    category: "Technology",
    author: {
      name: "Jordan Soltman",
      avatar: "/images/avatars/jordan.jpg",
    },
    readTime: "5 min read",
  },
];

const CATEGORIES = [
  { id: "technology", name: "Technology" },
  { id: "design", name: "Design" },
  { id: "management", name: "Management" },
  { id: "resources", name: "Resources" },
  { id: "customer-success", name: "Customer Success" },
];

export default function AllBlogsPage() {
  const [posts, setPosts] = useState(STATIC_POSTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // In a real app, this would fetch from Firebase
  // useEffect(() => {
  //   getDocs(collection(db, "posts")).then((snap) => {
  //     setPosts(snap.docs.map((d) => ({ id: d.id, ...(d.data() as any) })));
  //   });
  // }, []);

  // Filter posts based on search query and category
  const filteredPosts = posts.filter((post) => {
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
    <div className="container py-12">
      <div className="blog-header">
        <h1 className="text-4xl font-bold mb-4">All Blog Posts</h1>
        <p className="text-lg text-muted">
          Explore our collection of articles, tutorials, and insights
        </p>
      </div>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <BlogCategories
        categories={CATEGORIES}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
      />

      <div className="blog-grid">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No posts found</h3>
          <p className="text-muted">
            Try adjusting your search or filter to find what you're looking for
          </p>
        </div>
      )}
    </div>
  );
}
