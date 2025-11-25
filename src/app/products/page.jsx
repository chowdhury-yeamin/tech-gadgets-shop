"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://tech-gadgets-shop-server.vercel.app/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const result = await response.json();
        setProducts(result.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: "all", name: "All Products" },
    { id: "Smartphones", name: "Smartphones" },
    { id: "Laptops", name: "Laptops" },
    { id: "Wearables", name: "Wearables" },
    { id: "Audio", name: "Audio" },
    { id: "Gaming", name: "Gaming" },
    { id: "Smart Home", name: "Smart Home" },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.shortDescription
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-ring loading-xl text-primary"></span>
          <p className="text-xl text-gray-700 mt-4 font-semibold">Loading products...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-2xl text-red-600 mb-4 font-bold">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="btn btn-primary text-white"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Our Products
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Browse our extensive collection of premium tech gadgets. Find the
            perfect device for your needs with our carefully curated selection
            of the latest technology.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border border-gray-200">
          <div className="mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full pl-12 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary bg-gray-400"
              />
              <svg
                className="w-5 h-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div>
            <p className="font-semibold mb-4 text-gray-900">
              Filter by Category
            </p>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`btn btn-sm transition-all ${
                    selectedCategory === category.id
                      ? "btn-primary text-white shadow-md"
                      : "btn-outline btn-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-white shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-200 hover:border-primary"
              >
                <div className="card-body">
                  <div className="text-7xl text-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    {product.image || "📦"}
                  </div>

                  <h2 className="card-title text-lg line-clamp-2 text-gray-900 font-bold mb-2">
                    {product.title}
                  </h2>

                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {product.shortDescription || product.description}
                  </p>

                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-200">
                    <span className="text-3xl font-bold text-primary">
                      ${product.price}
                    </span>
                    <span className="badge badge-primary badge-outline">
                      {product.category}
                    </span>
                  </div>

                  <div className="card-actions mt-4">
                    <Link
                      href={`/products/${product._id}`}
                      className="btn btn-primary btn-sm w-full text-white hover:shadow-lg transition-all"
                    >
                      View Details
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-lg">
            <div className="text-7xl mb-6">🔍</div>
            <p className="text-3xl text-gray-700 mb-2 font-bold">
              No products found
            </p>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="btn btn-primary text-white gap-2"
            >
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}