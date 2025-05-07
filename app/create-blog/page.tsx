"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { useRouter } from "next/navigation";

export default function CreateBlogPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    category: "Technology",
    coverImage: null as File | null,
    coverImagePreview: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setFormData((prev) => ({
            ...prev,
            coverImage: file,
            coverImagePreview: event.target.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // In a real application, you would:
      // 1. Upload the cover image to Cloudinary
      // 2. Save the blog post data to Firebase

      // Example code (commented out for now):
      // const coverImageUrl = await uploadToCloudinary(formData.coverImage);
      //
      // const docRef = await addDoc(collection(db, "posts"), {
      //   title: formData.title,
      //   description: formData.description,
      //   content: formData.content,
      //   category: formData.category,
      //   coverImage: coverImageUrl,
      //   date: Date.now(),
      //   author: {
      //     name: "Your Name", // This would come from authentication
      //     avatar: "/your-avatar.jpg"
      //   },
      //   readTime: calculateReadTime(formData.content) + " min read"
      // });

      // For demonstration purposes, just delay and redirect
      setTimeout(() => {
        router.push("/blogs");
      }, 1500);
    } catch (error) {
      console.error("Error creating blog post:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreview = () => {
    setPreview(!preview);
  };

  // Function to calculate estimated read time
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Create a New Blog Post</h1>

      <div className="mb-6 flex gap-4">
        <button
          className={`btn ${!preview ? "btn-primary" : "btn-outline"}`}
          onClick={() => setPreview(false)}
        >
          Edit
        </button>
        <button
          className={`btn ${preview ? "btn-primary" : "btn-outline"}`}
          onClick={() => setPreview(true)}
          disabled={!formData.content}
        >
          Preview
        </button>
      </div>

      {!preview ? (
        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-input"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              id="category"
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="Technology">Technology</option>
              <option value="Design">Design</option>
              <option value="Management">Management</option>
              <option value="Resources">Resources</option>
              <option value="Customer Success">Customer Success</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image</label>
            <div className="file-input-container">
              <label htmlFor="coverImage" className="file-input-label">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                  <path d="M12 12v9"></path>
                  <path d="m16 16-4-4-4 4"></path>
                </svg>
                {formData.coverImagePreview ? "Change Image" : "Upload Image"}
              </label>
              <input
                type="file"
                id="coverImage"
                name="coverImage"
                className="file-input"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
            {formData.coverImagePreview && (
              <div className="mt-4">
                <img
                  src={formData.coverImagePreview}
                  alt="Cover preview"
                  className="max-h-64 rounded-md"
                />
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="content" className="form-label">
              Content (Markdown with LaTeX support)
            </label>
            <textarea
              id="content"
              name="content"
              className="form-textarea"
              value={formData.content}
              onChange={handleInputChange}
              placeholder="Write your blog post content here... Use Markdown for formatting and LaTeX for mathematical expressions."
              required
            ></textarea>
            <p className="text-sm text-muted mt-2">
              Supports Markdown formatting and LaTeX math expressions using
              $...$ for inline and $$...$$ for block equations.
            </p>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Publishing..." : "Publish Post"}
          </button>
        </form>
      ) : (
        <div className="blog-detail-content">
          <h1 className="text-3xl font-bold mb-4">
            {formData.title || "Blog Title"}
          </h1>
          <p className="text-muted mb-6">
            {formData.description || "Blog description will appear here."}
          </p>

          {formData.coverImagePreview && (
            <img
              src={formData.coverImagePreview}
              alt={formData.title}
              className="w-full rounded-lg mb-6"
            />
          )}

          {formData.content ? (
            <div className="prose">
              {/* Replace with your MarkdownRenderer when connected */}
              <pre className="whitespace-pre-wrap">{formData.content}</pre>
            </div>
          ) : (
            <p className="text-muted">Blog content will be rendered here.</p>
          )}
        </div>
      )}
    </div>
  );
}
