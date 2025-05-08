"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BlogPost } from "@/lib/blog-utils";
import Image from "next/image";
import { marked } from "marked";
import Link from "next/link";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export default function BlogPostPage() {
  const params = useParams();
  const postId = params.id as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const postDoc = doc(db, "blog-posts", postId);
        const postSnapshot = await getDoc(postDoc);

        if (postSnapshot.exists()) {
          setPost({ id: postSnapshot.id, ...postSnapshot.data() } as BlogPost);
        } else {
          setError("Blog post not found");
        }
      } catch (err) {
        console.error("Error fetching blog post:", err);
        setError("Failed to load blog post");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  if (loading) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <p className="text-lg">Loading post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || "Error loading post"}
          </h1>
          <Link href="/blogs" className="text-blue-500 hover:underline">
            Back to all posts
          </Link>
        </div>
      </div>
    );
  }

  // Format the date
  const formattedDate =
    typeof post.date === "string"
      ? new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });

  return (
    <div className="container py-12">
      <Link
        href="/blogs"
        className="text-blue-500 hover:underline mb-8 inline-block"
      >
        ← Back to all posts
      </Link>

      <article className="blog-post">
        <header className="blog-post-header mb-8">
          {post.category && (
            <span className={`blog-card-tag ${post.category.toLowerCase()}`}>
              {post.category}
            </span>
          )}
          <h1 className="text-4xl font-bold mt-4 mb-6">{post.title}</h1>

          <div className="blog-post-meta flex items-center gap-4 text-gray-600">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.avatar && (
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            <span>{formattedDate}</span>
            {post.readTime && <span>{post.readTime}</span>}
          </div>
        </header>

        {post.coverImage && (
          <div className="blog-post-featured-image mb-8">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-auto rounded-lg"
            />
          </div>
        )}

        <div className="blog-post-content prose lg:prose-xl max-w-none">
          {post.description && (
            <p className="text-xl mb-6">{post.description}</p>
          )}

          {/* This is where you'd render the full content of the blog post */}
          {/* For demo purposes, we're just showing the description */}
          <div className="mb-8">
            <MarkdownRenderer markdown={post.content || ""} />
          </div>
        </div>
      </article>
    </div>
  );
}
