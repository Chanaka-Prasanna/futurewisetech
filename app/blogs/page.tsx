"use client";
import { useState, useEffect } from "react";
import BlogCard from "@/components/BlogCard";
import SearchBar from "@/components/SearchBar";
import BlogCategories from "@/components/BlogCategories";
import { getPaginatedBlogPosts, BlogPost } from "@/lib/blog-utils";

const CATEGORIES = [
  { id: "learning", name: "Learning" },
  { id: "news", name: "News" },
  { id: "insights", name: "Insights" },
];

const POSTS_PER_PAGE = 20;

export default function AllBlogsPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async (loadMore = false) => {
    try {
      setLoading(true);

      const result = await getPaginatedBlogPosts(
        POSTS_PER_PAGE,
        loadMore ? lastVisible : null
      );

      setHasMore(result.hasMore);
      setLastVisible(result.lastVisible);

      if (loadMore) {
        setPosts((prevPosts) => [...prevPosts, ...result.posts]);
        setCurrentPage((prevPage) => prevPage + 1);
      } else {
        setPosts(result.posts);
        setCurrentPage(1);
      }
    } catch (error) {
      console.error("Error loading blog posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    if (hasMore && !loading) {
      fetchPosts(true);
    }
  };

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

      {loading && posts.length === 0 ? (
        <div className="text-center py-12">
          <p>Loading blog posts...</p>
        </div>
      ) : (
        <>
          <div className="blog-grid">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No posts found</h3>
              <p className="text-muted">
                Try adjusting your search or filter to find what you're looking
                for
              </p>
            </div>
          )}

          {!loading &&
            hasMore &&
            filteredPosts.length > 0 &&
            !searchQuery &&
            !selectedCategory && (
              <div className="text-center py-8">
                <button
                  onClick={loadMore}
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More Posts"}
                </button>
              </div>
            )}
        </>
      )}
    </div>
  );
}
