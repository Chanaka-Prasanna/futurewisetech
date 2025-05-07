import { notFound } from "next/navigation";
import Image from "next/image";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Link from "next/link";

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
    content: `
# The Impact of Technology on the Workplace

Technology has fundamentally transformed the modern workplace in ways that would have been difficult to imagine just a few decades ago. From remote work capabilities to artificial intelligence, these innovations are reshaping how we collaborate, communicate, and complete tasks.

## Remote Work Revolution

The COVID-19 pandemic accelerated the adoption of remote work, but the technological foundations were already in place. Cloud-based tools, video conferencing platforms, and project management software have made it possible for teams to collaborate effectively regardless of physical location.

## Artificial Intelligence and Automation

AI is increasingly handling routine and repetitive tasks, allowing human workers to focus on more creative, strategic, and interpersonal aspects of their jobs. This shift is creating new types of roles while eliminating others.

> "The greatest danger in times of turbulence is not the turbulence itself, but to act with yesterday's logic." - Peter Drucker

## The Future of Work

As technology continues to evolve, we can expect even more significant changes:

- **Augmented Reality (AR) and Virtual Reality (VR)** will transform training and collaboration.
- **Blockchain** will revolutionize contract management and verification processes.
- **Internet of Things (IoT)** will create smarter, more efficient workspaces.

## Conclusion

Embracing technological change is no longer optional for businesses that want to remain competitive. By understanding these trends and adapting accordingly, organizations can position themselves for success in the rapidly evolving workplace of tomorrow.
`,
  },
  // Add more static posts here
];

// Generate static params to pre-render specific blog paths
export async function generateStaticParams() {
  return STATIC_POSTS.map((post) => ({
    id: post.id,
  }));
}

// This function fixes the params.id usage issue
export default function BlogPostPage({ params }: { params: { id: string } }) {
  // Extract the ID as a separate variable first
  const { id } = params;

  // Then use that variable in your logic
  const post = STATIC_POSTS.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  // Format the date
  const formattedDate =
    typeof post.date === "number"
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
      <article>
        <div className="blog-detail-header">
          {post.category && (
            <Link
              href={`/blogs?category=${post.category.toLowerCase()}`}
              className={`blog-card-tag ${post.category.toLowerCase()}`}
            >
              {post.category}
            </Link>
          )}

          <h1 className="blog-detail-title">{post.title}</h1>

          <div className="blog-detail-meta">
            {post.author && (
              <div className="blog-detail-author">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img
                    src="https://placehold.co/100x100/gray/white?text=Avatar"
                    alt={post.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{post.author.name}</span>
              </div>
            )}

            <div className="blog-detail-date">{formattedDate}</div>

            {post.readTime && (
              <div className="blog-detail-readtime">{post.readTime}</div>
            )}
          </div>

          <div className="mt-6 mb-8 rounded-lg overflow-hidden">
            <img
              src="https://placehold.co/1200x600/pink/white?text=Blog+Cover+Image"
              alt={post.title}
              className="w-full max-h-[500px] object-cover"
            />
          </div>
        </div>

        <div className="blog-detail-content">
          <div className="warning-box">
            <p className="text-center">
              "Traveling can expose you to new environments and potential health
              risks, so it's crucial to take precautions to stay safe and
              healthy."
            </p>
          </div>

          <MarkdownRenderer content={post.content} />
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <h3 className="text-2xl font-bold mb-4">Share this blog:</h3>
          <div className="flex gap-4">
            <button className="btn btn-outline btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
              </svg>
              Twitter
            </button>
            <button className="btn btn-outline btn-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
              </svg>
              Facebook
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
