"use client";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
}

interface BlogCategoriesProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  selectedCategory: string;
}

export default function BlogCategories({
  categories,
  onSelectCategory,
  selectedCategory,
}: BlogCategoriesProps) {
  return (
    <div className="blog-categories">
      <button
        className={`category-btn ${selectedCategory === "" ? "active" : ""}`}
        onClick={() => onSelectCategory("")}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-btn ${
            selectedCategory === category.id ? "active" : ""
          }`}
          onClick={() => onSelectCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
