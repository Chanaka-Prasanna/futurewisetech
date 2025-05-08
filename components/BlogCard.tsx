import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    description?: string;
    coverImage: string;
    date: number | string;
    category?: string;
    author?: {
      name: string;
      avatar?: string;
    };
    readTime?: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  const [imageError, setImageError] = useState(false);

  // Format the date
  const formattedDate =
    typeof post.date === "number"
      ? new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : new Date(post.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

  return (
    <Link href={`/blog/${post.id}`} className="blog-card">
      <div className="relative w-full aspect-video">
        {/* Use next/image with unoptimized for development */}
        <img
          src={
            imageError
              ? "https://placehold.co/600x400/pink/white?text=Blog+Image"
              : post.coverImage
          }
          alt={post.title}
          onError={() => setImageError(true)}
          className="blog-card-img"
        />
      </div>
      <div className="blog-card-content">
        {post.category && (
          <span className={`blog-card-tag ${post.category.toLowerCase()}`}>
            {post.category}
          </span>
        )}
        <p className="blog-card-title text-md line-clamp-2">{post.title}</p>
        {post.description && (
          <p className="blog-card-description line-clamp-2">
            {post.description}
          </p>
        )}
        <div className="blog-card-meta">
          {post.author && (
            <div className="blog-card-author">
              <div className="w-7 h-7 rounded-full overflow-hidden">
                <img
                  src={
                    imageError
                      ? "https://placehold.co/100x100/gray/white?text=Avatar"
                      : post.author.avatar ||
                        "https://placehold.co/100x100/gray/white?text=Avatar"
                  }
                  alt={post.author.name}
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="blog-card-author-name">{post.author.name}</span>
            </div>
          )}
          <span className="blog-card-date">{formattedDate}</span>
          {post.readTime && (
            <span className="blog-card-readtime">{post.readTime}</span>
          )}
        </div>
      </div>
    </Link>
  );
}
