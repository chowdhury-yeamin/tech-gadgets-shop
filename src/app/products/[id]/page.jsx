"use client";

import Link from "next/link";
import { useState, useEffect, use } from "react";

export default function ProductDetails({ params }) {
  // FIX: Unwrap the params Promise
  const { id } = use(params);

  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) throw new Error("Product not found");
        const result = await response.json();
        setProduct(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <span className="loading loading-ring loading-xl text-primary"></span>
      </div>
    );

  if (error || !product)
    return (
      <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">
            Error: {error || "Product not found"}
          </p>
          <Link href="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <Link href="/products" className="btn btn-ghost mb-8 text-gray-700 hover:text-primary">
          ← Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
              <div className="text-9xl">{product.image || "📦"}</div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="badge badge-primary badge-lg text-white">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4 text-gray-900">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-600">
                    {product.rating} ({product.reviews || 0} reviews)
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-bold text-primary">
                  ${product.price}
                </span>
                <p className="text-sm text-gray-500 mt-2">
                  {product.inStock !== false ? (
                    <span className="text-green-600 font-semibold">
                      ✓ In Stock
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Out of Stock
                    </span>
                  )}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.shortDescription || product.description}
              </p>

              {/* Quantity Selector */}
              <div className="mb-6 flex items-center gap-4">
                <label className="font-semibold text-gray-900">Quantity:</label>
                <div className="flex items-center border-2 border-gray-300 rounded-lg overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.inStock === false}
                className={`btn btn-lg w-full mb-4 ${
                  addedToCart
                    ? "btn-success text-white"
                    : "btn-primary text-white"
                } ${product.inStock === false && "btn-disabled"}`}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>

          {/* Detailed Description */}
          {product.fullDescription && (
            <div className="p-8 border-t bg-gray-50">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                About This Product
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {product.fullDescription}
              </p>
            </div>
          )}

          {/* Specifications */}
          {product.specs && product.specs.length > 0 && (
            <div className="p-8 border-t">
              <h3 className="text-xl font-bold mb-4 text-gray-900">
                Specifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-gray-200"
                  >
                    <span className="text-primary text-xl">✓</span>
                    <span className="text-gray-800">{spec}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          <div className="p-8 border-t bg-gradient-to-br from-gray-50 to-white">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">
              Customer Reviews
            </h3>
            <div className="space-y-4">
              {[
                {
                  name: "Alex Johnson",
                  rating: 5,
                  text: "Excellent product! Exactly as described.",
                },
                {
                  name: "Maria Garcia",
                  rating: 4,
                  text: "Great quality, fast delivery.",
                },
                {
                  name: "John Smith",
                  rating: 5,
                  text: "Highly recommended! Best purchase ever.",
                },
              ].map((review, idx) => (
                <div
                  key={idx}
                  className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">
                      {review.name}
                    </span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}