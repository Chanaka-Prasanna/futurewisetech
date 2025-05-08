"use client";
import { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function CreateBlogPage() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
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
        const target = event.target;
        if (target && target.result) {
          setFormData((prev) => ({
            ...prev,
            coverImage: file,
            coverImagePreview: target.result as string,
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Use our API route instead of direct Cloudinary access
      console.log("Sending file to API route:", file.name);
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Cloudinary error details:", errorData);
        throw new Error(
          `Image upload failed: ${errorData.error || "Unknown error"}`
        );
      }

      const data = await response.json();
      console.log("Full Cloudinary response:", data);

      // Make sure we have a secure_url in the response
      if (!data.secure_url) {
        console.error("Missing secure_url in Cloudinary response:", data);
        throw new Error("Invalid response from image upload");
      }

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    console.log("Form submit function called");
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    console.log("Starting blog post creation process...");

    try {
      let coverImageUrl = "";

      // Upload the cover image to Cloudinary if available
      if (formData.coverImage) {
        console.log("Uploading cover image to Cloudinary...");
        try {
          coverImageUrl = await uploadImageToCloudinary(formData.coverImage);
          console.log("Image uploaded successfully:", coverImageUrl);
        } catch (imageError) {
          console.error("Error uploading image:", imageError);
          setError("Failed to upload image. Please try again.");
          setIsSubmitting(false);
          return;
        }
      }

      // Create the blog post data
      console.log("Preparing blog post data...");
      const blogPostData = {
        title: formData.title,
        description: formData.description,
        content: formData.content,
        category: formData.category,
        coverImage: coverImageUrl,
        date: new Date().toISOString(),
        author: {
          name: "Chanaka Prasanna", // In a real app, this would come from auth
          avatar: "https://placehold.co/100x100/gray/white?text=CP", // Default avatar
        },
        readTime: `${calculateReadTime(formData.content)} min read`,
      };

      console.log("Blog post data:", blogPostData);

      // Add the blog post to Firestore
      console.log("Saving to Firestore...");
      const docRef = await addDoc(collection(db, "blog-posts"), blogPostData);

      console.log("Blog post created with ID:", docRef.id);
      setSuccess(`Blog post created successfully! ID: ${docRef.id}`);

      // Wait a moment to show the success message
      setTimeout(() => {
        // Redirect to blogs page
        router.push("/blogs");
      }, 2000);
    } catch (error) {
      console.error("Error creating blog post:", error);
      setError("Failed to create blog post. Please check console for details.");
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

      {error && (
        <div className="alert alert-error mb-6">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="alert alert-success mb-6">
          <p>{success}</p>
        </div>
      )}

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
