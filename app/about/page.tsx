export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <p className="mb-4">
          Riven is a platform dedicated to sharing knowledge, insights, and
          resources about technology, design, business, and more. Our mission is
          to help professionals stay informed about the latest trends and best
          practices in their fields.
        </p>

        <p className="mb-4">
          Founded in 2023, we've built a community of experts and enthusiasts
          who contribute their expertise through thoughtful blog posts,
          tutorials, and analyses. Our content is designed to be practical,
          accessible, and immediately applicable to your work.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>

        <p className="mb-4">
          We're a diverse group of professionals with backgrounds in software
          development, design, product management, and marketing. This diversity
          of experience allows us to cover a wide range of topics with depth and
          authenticity.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>

        <ul className="list-disc pl-5 mb-4 space-y-2">
          <li>
            <strong>Quality over quantity</strong> - We focus on publishing
            well-researched, thorough content rather than chasing high post
            counts.
          </li>
          <li>
            <strong>Practicality</strong> - Every article should provide
            actionable insights that readers can apply immediately.
          </li>
          <li>
            <strong>Inclusivity</strong> - We strive to make our content
            accessible to professionals at all levels, from beginners to
            experts.
          </li>
          <li>
            <strong>Community</strong> - We encourage discussion and feedback to
            create a vibrant learning environment.
          </li>
        </ul>

        <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>

        <p className="mb-8">
          Have a question, suggestion, or want to contribute to our blog? We'd
          love to hear from you! Visit our{" "}
          <a href="/contact" className="text-primary hover:underline">
            Contact page
          </a>{" "}
          to get in touch.
        </p>
      </div>
    </div>
  );
}
