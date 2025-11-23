"use client";

import { useState } from "react";
import Link from "next/link";

export default function ManageProductsPage() {
  // Mock products data
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "iPhone 15 Pro",
      category: "smartphones",
      price: 999,
      stock: 45,
      status: "active",
    },
    {
      id: 2,
      title: "MacBook Pro 16",
      category: "laptops",
      price: 2499,
      stock: 12,
      status: "active",
    },
    {
      id: 3,
      title: "Apple Watch Series 9",
      category: "wearables",
      price: 399,
      stock: 0,
      status: "inactive",
    },
    {
      id: 4,
      title: "Sony WH-1000XM5",
      category: "audio",
      price: 399,
      stock: 28,
      status: "active",
    },
    {
      id: 5,
      title: "PlayStation 5",
      category: "gaming",
      price: 499,
      stock: 8,
      status: "active",
    },
    {
      id: 6,
      title: "Amazon Echo Pro",
      category: "smart-home",
      price: 199,
      stock: 35,
      status: "active",
    },
  ]);

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const handleDelete = (id) => {
    if (deleteConfirm === id) {
      setProducts(products.filter((p) => p.id !== id));
      setDeleteConfirm(null);
    } else {
      setDeleteConfirm(id);
    }
  };

  const handleStatusToggle = (id) => {
    setProducts(
      products.map((p) =>
        p.id === id
          ? {
              ...p,
              status: p.status === "active" ? "inactive" : "active",
            }
          : p
      )
    );
  };

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
                {products.filter((p) => p.status === "active").length}
              </p>
            </div>
          </div>
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-red-500">
            <div className="card-body">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                Out of Stock
              </h3>
              <p className="text-4xl font-bold text-red-600 mt-2">
                {products.filter((p) => p.stock === 0).length}
              </p>
            </div>
          </div>
          <div className="card bg-white shadow-lg hover:shadow-xl transition-shadow border-t-4 border-blue-500">
            <div className="card-body">
              <h3 className="text-gray-600 font-semibold text-sm uppercase tracking-wide">
                Total Inventory
              </h3>
              <p className="text-4xl font-bold text-blue-600 mt-2">
                {products.reduce((sum, p) => sum + p.stock, 0)}
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
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, idx) => (
                  <tr
                    key={product.id}
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
                      ${product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div
                        className={`font-semibold inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                          product.stock > 20
                            ? "bg-green-100 text-green-700"
                            : product.stock > 0
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.stock > 0 ? "✓" : "⚠"} {product.stock} units
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleStatusToggle(product.id)}
                        className={`badge badge-lg cursor-pointer transition-all hover:scale-105 ${
                          product.status === "active"
                            ? "badge-success text-white"
                            : "badge-error text-white"
                        }`}
                      >
                        {product.status}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="btn btn-sm btn-primary btn-outline hover:bg-primary hover:text-white transition-colors"
                          title="View"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => setEditingId(product.id)}
                          className="btn btn-sm btn-info btn-outline hover:bg-info hover:text-white transition-colors"
                          title="Edit"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className={`btn btn-sm transition-all ${
                            deleteConfirm === product.id
                              ? "btn-error text-white animate-pulse"
                              : "btn-error btn-outline hover:bg-error hover:text-white"
                          }`}
                          title={
                            deleteConfirm === product.id
                              ? "Click again to confirm"
                              : "Delete"
                          }
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
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
              Add Your First Product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
