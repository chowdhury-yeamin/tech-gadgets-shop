"use client";

import { useState } from "react";
import Link from "next/link";
import PrivateRoute from "@/Components/PrivetRoute/PrivetRoute";

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    price: "",
    category: "Smartphones",
    image: "",
    inStock: true,
  });
  const [errors, setErrors] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Smartphones",
    "Laptops",
    "Wearables",
    "Audio",
    "Gaming",
    "Smart Home",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
    if (submitError) setSubmitError("");
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.shortDescription.trim())
      newErrors.shortDescription = "Short description is required";
    if (!formData.price || parseFloat(formData.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setSubmitError("Please fix the errors above");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const payload = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim() || undefined,
        fullDescription: formData.fullDescription.trim() || undefined,
        price: formData.price ? parseFloat(formData.price) : undefined,
        category: formData.category,
        image: formData.image.trim(),
        inStock: formData.inStock,
        rating: 0,
        reviews: 0,
        specs: [],
      };

      const response = await fetch("http://localhost:5000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add product");
      }

      setSubmitSuccess(true);
      setFormData({
        title: "",
        shortDescription: "",
        fullDescription: "",
        price: "",
        category: "Smartphones",
        image: "",
        inStock: true,
      });
      setErrors({});
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PrivateRoute>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          {/* Page Header */}
          <div className="mb-8">
            <Link
              href="/manage-products"
              className="btn btn-ghost mb-4 text-gray-700 hover:text-primary"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Products
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Add New Product
            </h1>
            <p className="text-gray-600">
              Fill in the details below to add a new product to your inventory
            </p>
          </div>

          {/* Success Alert */}
          {submitSuccess && (
            <div className="alert alert-success shadow-lg mb-6 text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Product added successfully!</span>
            </div>
          )}

          {/* Error Alert */}
          {submitError && (
            <div className="alert alert-error shadow-lg mb-6 text-white">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{submitError}</span>
            </div>
          )}

          {/* Form Card */}
          <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., iPhone 15 Pro Max"
                  className={`input input-bordered w-full text-gray-200 ${
                    errors.title ? "input-error" : "focus:border-primary"
                  }`}
                />
                {errors.title && (
                  <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.title}
                  </span>
                )}
              </div>

              {/* Short Description */}
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleChange}
                  placeholder="Brief product description (1-2 sentences)"
                  className={`input input-bordered w-full text-gray-200 ${
                    errors.shortDescription
                      ? "input-error"
                      : "focus:border-primary"
                  }`}
                />
                {errors.shortDescription && (
                  <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.shortDescription}
                  </span>
                )}
              </div>

              {/* Full Description */}
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  Full Description{" "}
                  <span className="text-gray-500 text-sm font-normal">
                    (Optional)
                  </span>
                </label>
                <textarea
                  name="fullDescription"
                  value={formData.fullDescription}
                  onChange={handleChange}
                  placeholder="Detailed product description, features, specifications..."
                  className="textarea textarea-bordered w-full text-gray-00 focus:border-primary h-32"
                  rows={4}
                />
              </div>

              {/* Price and Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Price */}
                <div>
                  <label className="block font-semibold text-gray-900 mb-2">
                    Price ($) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`input input-bordered w-full text-gray-300 ${
                      errors.price ? "input-error" : "focus:border-primary"
                    }`}
                  />
                  {errors.price && (
                    <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.price}
                    </span>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className="block font-semibold text-gray-900 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="select select-bordered w-full text-gray-300 focus:border-primary"
                  >
                    {categories.map((opt) => (
                      <option key={opt} value={opt} className="text-gray-300">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block font-semibold text-gray-900 mb-2">
                  Image (Emoji or URL) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="📱 or https://example.com/image.jpg"
                  className={`input input-bordered w-full text-gray-200 ${
                    errors.image ? "input-error" : "focus:border-primary"
                  }`}
                />
                {errors.image && (
                  <span className="text-red-600 text-sm mt-1 flex items-center gap-1">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.image}
                  </span>
                )}
                {formData.image && (
                  <div className="mt-2 text-4xl">{formData.image}</div>
                )}
              </div>

              {/* In Stock Checkbox */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleChange}
                    className="checkbox checkbox-primary"
                  />
                  <span className="font-semibold text-gray-900">
                    Product is in stock
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="btn btn-primary flex-1 text-white gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      Adding Product...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Product
                    </>
                  )}
                </button>
                <Link
                  href="/manage-products"
                  className="btn btn-outline btn-primary flex-1 hover:bg-primary hover:text-white"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}
