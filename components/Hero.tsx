import Link from "next/link";

export default function Hero() {
  return (
    <div className="container py-12 md:py-20">
      <div className="bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-lg border border-gray-100/10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            FutureWiseTech Blogs
          </h1>
          <p className="text-lg text-muted mb-6">
            Exploring AI, Machine Learning, and emerging technologies with
            expert insights
          </p>
          <div className="flex gap-4">
            <Link href="/featured">
              <span className="inline-block bg-primary text-white px-5 py-2.5 rounded-lg font-medium hover:bg-primary/90 transition duration-300">
                Featured Posts
              </span>
            </Link>
            <Link href="/all">
              <span className="inline-block bg-white text-primary border border-gray-200 px-5 py-2.5 rounded-lg font-medium hover:bg-gray-50 transition duration-300">
                Browse All
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
