"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/products");
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

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");

      setProducts(products.filter((p) => p._id !== id));
      Swal.fire("Deleted!", "Your product has been deleted.", "success");
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-gray-900">
              Manage Products
            </h1>
            <p className="text-gray-600">
              View, edit, and manage your product inventory
            </p>
          </div>
          <Link
            href="/add-product"
            className="btn btn-primary gap-2 text-white shadow-lg hover:shadow-xl transition-shadow"
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
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add New Product
          </Link>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-primary">
            <div className="card-body">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                Total Products
              </h3>
              <p className="text-4xl font-bold text-primary mt-2">
                {products.length}
              </p>
            </div>
          </div>
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-green-500">
            <div className="card-body">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                Active Products
              </h3>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {products.filter((p) => p.inStock === true).length}
              </p>
            </div>
          </div>
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
            <div className="card-body">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                Out of Stock
              </h3>
              <p className="text-4xl font-bold text-red-600 mt-2">
                {products.filter((p) => p.inStock === false).length}
              </p>
            </div>
          </div>
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
            <div className="card-body">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                Total Inventory
              </h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {products.reduce((sum, p) => sum + (p.inStock ? 1 : 0), 0)}
              </p>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white border-b-2 border-primary">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold">Product</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Category
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Price</th>
                  <th className="px-6 py-4 text-left font-semibold">Stock</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="border-b hover:bg-primary/5 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {product.title}
                    </td>
                    <td className="px-6 py-4">
                      <span className="badge badge-outline badge-primary text-xs">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-primary text-lg">
                      ${product.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`font-semibold inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                          product.inStock === false
                            ? "bg-red-100 text-red-700"
                            : product.inStock === true
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {product.inStock === true ? "✓" : "⚠"}{" "}
                        {product.inStock ? "In Stock" : "Out of Stock"}
                      </div>
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link
                        href={`/products/${product._id}`}
                        className="btn btn-sm btn-primary btn-outline hover:bg-primary hover:text-white transition-colors"
                        title="View"
                      >
                        View
                      </Link>
                    
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="btn btn-sm btn-outline text-red-400 hover:bg-red-500 hover:text-white transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {products.length === 0 && !loading && (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📦</div>
            <p className="text-2xl text-gray-700 mb-2 font-semibold">
              No products found
            </p>
            <p className="text-gray-500 mb-6">
              Get started by adding your first product
            </p>
            <Link
              href="/add-product"
              className="btn btn-primary btn-lg gap-2 text-white"
            >
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
