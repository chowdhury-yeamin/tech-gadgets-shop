"use client";

import { useState } from "react";
import Link from "next/link";

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
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title required";
    if (!formData.shortDescription.trim())
      newErrors.shortDescription = "Short description required";
    if (!formData.price || parseFloat(formData.price) < 0)
      newErrors.price = "Valid price required";
    if (!formData.image.trim()) newErrors.image = "Image required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return setSubmitError("Fix errors above");

    try {
      const payload = {
        title: formData.title.trim(),
        shortDescription: formData.shortDescription.trim(),
        fullDescription: formData.fullDescription.trim() || undefined,
        price: parseFloat(formData.price),
        category: formData.category,
        image: formData.image.trim(),
        inStock: formData.inStock,
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
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setSubmitError(err.message || "Failed to add product");
    }
  };

  const fields = [
    { label: "Title", name: "title", type: "text", required: true },
    {
      label: "Short Description",
      name: "shortDescription",
      type: "text",
      required: true,
    },
    { label: "Full Description", name: "fullDescription", type: "textarea" },
    { label: "Price ($)", name: "price", type: "number", required: true },
    {
      label: "Category",
      name: "category",
      type: "select",
      options: categories,
    },
    { label: "Image URL", name: "image", type: "text", required: true },
    { label: "In Stock", name: "inStock", type: "checkbox" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto max-w-xl p-6 bg-white rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Add Product</h1>
        {submitSuccess && (
          <div className="text-green-600 mb-4">Product added successfully!</div>
        )}
        {submitError && <div className="text-red-600 mb-4">{submitError}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((f) => (
            <div key={f.name}>
              {f.type === "textarea" ? (
                <>
                  <label className="block font-semibold">{f.label}</label>
                  <textarea
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    rows={3}
                  />
                </>
              ) : f.type === "select" ? (
                <>
                  <label className="block font-semibold">{f.label}</label>
                  <select
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  >
                    {f.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </>
              ) : f.type === "checkbox" ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={f.name}
                    checked={formData[f.name]}
                    onChange={handleChange}
                  />
                  {f.label}
                </label>
              ) : (
                <>
                  <label className="block font-semibold">{f.label}</label>
                  <input
                    type={f.type}
                    name={f.name}
                    value={formData[f.name]}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                  />
                </>
              )}
              {errors[f.name] && (
                <span className="text-red-600 text-sm">{errors[f.name]}</span>
              )}
            </div>
          ))}
          <div className="flex gap-4">
            <button type="submit" className="btn btn-primary flex-1">
              Add Product
            </button>
            <Link href="/products" className="btn btn-outline flex-1">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
