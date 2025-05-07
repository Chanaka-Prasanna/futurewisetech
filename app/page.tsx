import Hero from "@/components/Hero";
import BlogsSection from "@/components/BlogsSection";

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
];

const CATEGORIES = [
  { id: "technology", name: "Technology" },
  { id: "design", name: "Design" },
  { id: "management", name: "Management" },
  { id: "resources", name: "Resources" },
  { id: "customer-success", name: "Customer Success" },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <BlogsSection initialPosts={STATIC_POSTS} categories={CATEGORIES} />
    </>
  );
}
