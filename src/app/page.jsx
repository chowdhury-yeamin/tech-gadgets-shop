"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://tech-gadgets-shop-server.vercel.app/products");
        if (response.ok) {
          const result = await response.json();
          setProducts(result.data || []);
        } else {
          throw new Error("Failed to fetch");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoadingProducts(false);
      }
    };
    fetchProducts();
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <div className="bg-white min-h-screen text-gray-900">
      {/* Hero */}
      <section className="hero h-[60vh] md:h-[500px] bg-gradient-to-r from-primary via-blue-500 to-secondary text-white flex items-center">
        <div className="w-full max-w-5xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-4 md:mb-6 leading-tight">
              Welcome to QuantumGear
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 max-w-3xl mx-auto">
              Discover cutting-edge technology gadgets that transform your
              digital lifestyle
            </p>
            <div className="flex justify-center">
              <Link href="/products" className="btn btn-lg btn-accent gap-2">
                Shop Now
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
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section
        aria-labelledby="featured-products-heading"
        className="py-8 md:py-16 bg-gray-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2
            id="featured-products-heading"
            className="text-4xl font-bold text-center mb-12"
          >
            Featured Products
          </h2>
          {loadingProducts ? (
            <p className="text-center text-gray-600">
              <span className="loading loading-ring loading-xl"></span>
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.slice(0, 6).map((product) => (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="card bg-white shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="card-body">
                    <div className="text-6xl text-center mb-4 group p-hover:scale-110 transition-transform">
                      {product.image || "📦"}
                    </div>
                    <h3 className="card-title text-lg line-clamp-2 text-gray-800 font-semibold">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price}
                      </span>
                      <span className="badge badge-outline">
                        {product.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/*  Features */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16">
            Why Choose QuantumGear?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Shipping",
                text: "Get your gadgets delivered within 24-48 hours",
              },
              {
                icon: "💰",
                title: "Best Prices",
                text: "Competitive pricing with regular discounts",
              },
              {
                icon: "🔒",
                title: "Secure Payment",
                text: "100% secure transactions guaranteed",
              },
              {
                icon: "🎁",
                title: "Easy Returns",
                text: "30-day hassle-free return policy",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="card bg-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="card-body text-center p-6">
                  <div className="text-5xl mb-4">{f.icon}</div>
                  <h3 className="card-title justify-center text-xl text-gray-900 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-gray-600">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10 md:mb-16">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                rating: 5,
                text: "Amazing selection of products! Delivery was fast and customer service was excellent.",
              },
              {
                name: "Sarah Johnson",
                rating: 5,
                text: "Best prices I found online. The quality of products is top-notch and packaging was perfect.",
              },
              {
                name: "Mike Wilson",
                rating: 5,
                text: "Great experience shopping here. The product descriptions are detailed and accurate.",
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="card bg-white shadow-md hover:shadow-lg transition-all"
              >
                <div className="card-body p-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-gray-600 mb-4">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <p className="font-semibold text-right text-gray-800">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Banner */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-center mb-8 text-gray-100">
            Get exclusive deals and updates on the latest tech gadgets delivered
            to your inbox
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input input-bordered flex-1 text-gray-400"
            />
            <button type="submit" className="btn btn-accent">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
