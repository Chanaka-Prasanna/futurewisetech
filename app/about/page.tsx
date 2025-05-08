export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">About FutureWiseTech</h1>

        <p className="mb-4">
          FutureWiseTech is a platform dedicated to sharing knowledge, insights,
          and resources about Artificial Intelligence, Machine Learning, Deep
          Learning, NLP, Data Science, and Software Engineering. Our mission is
          to help professionals stay informed about the latest trends and best
          practices in these rapidly evolving fields.
        </p>

        <p className="mb-4">
          Founded in 2023, we've built a community of AI and technology experts
          who contribute their expertise through thoughtful blog posts,
          tutorials, and analyses. Our content is designed to be practical,
          accessible, and immediately applicable to your work.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Team</h2>

        <p className="mb-4">
          We're a diverse group of professionals with backgrounds in AI
          research, machine learning engineering, data science, and software
          development. This diversity of experience allows us to cover a wide
          range of topics with depth and authenticity.
        </p>

        <h2 className="text-2xl font-bold mt-8 mb-4">Our Values</h2>

        <p className="mb-4">
          At FutureWiseTech, we believe in the power of AI and technology to
          transform businesses and improve lives. We're committed to providing
          accurate, thoughtful, and ethical coverage of emerging technologies.
          Our content aims to make complex topics accessible without
          compromising technical accuracy.
        </p>

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
