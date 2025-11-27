"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { auth } from "../Firebase/firebase.config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import Swal from "sweetalert2";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out!",
    });

    if (result.isConfirmed) {
      try {
        await signOut(auth);
        Swal.fire("Logged Out!", "You have been successfully logged out.", "success");
        setUser(null);
      } catch (err) {
        console.error("Logout failed:", err);
        Swal.fire("Error!", "Logout failed. Please try again.", "error");
      }
    }
  };

  const linkClasses = (path) =>
    `px-3 py-2 rounded-2xl  transition-all duration-200 hover:-translate-y-0.5  ${
      isActive(path)
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-800"
    }`;

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>

            {/* MOBILE MENU */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
            >
              <Link className={linkClasses("/")} href="/">Home</Link>
              <Link className={linkClasses("/products")} href="/products">Products</Link>
              <Link className={linkClasses("/add-product")} href="/add-product">Add Product</Link>
              <Link className={linkClasses("/manage-products")} href="/manage-products">Manage Products</Link>
              <Link className={linkClasses("/about")} href="/about">About</Link>
            </ul>
          </div>

          <Link href="/" className="btn btn-ghost text-xl">QuantumGear</Link>
        </div>

        {/* DESKTOP MENU */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-5">
            <Link className={linkClasses("/")} href="/">Home</Link>
            <Link className={linkClasses("/products")} href="/products">Products</Link>
            <Link className={linkClasses("/add-product")} href="/add-product">Add Product</Link>
            <Link className={linkClasses("/manage-products")} href="/manage-products">Manage Products</Link>
            <Link className={linkClasses("/about")} href="/about">About</Link>
          </ul>
        </div>

        {/* RIGHT SIDE */}
        <div className="navbar-end flex items-center gap-2">
          {user ? (
            <>
              <button
                className="btn btn-ghost rounded-full btn-circle p-0"
                onClick={() => setIsModalOpen(true)}
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt="Profile"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </button>

              {/* Profile Modal */}
              {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg w-80 relative">
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="absolute top-3 right-3 btn btn-circle btn-ghost"
                    >
                      ✕
                    </button>

                    <div className="text-center">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt="Profile"
                        className="mx-auto rounded-full w-32 h-32 mb-3"
                      />

                      <h3 className="font-bold text-lg">{user.displayName || "User"}</h3>
                      <p className="text-gray-500 text-sm">{user.email}</p>
                      <p className="text-gray-400 text-xs mb-4">
                        {user.emailVerified ? "(Verified)" : "(Not Verified)"}
                      </p>

                      <Link href="/add-product" className="btn bg-purple-500 w-full mb-2 hover:bg-purple-700">Add Product</Link>
                      <Link href="/manage-products" className="btn bg-purple-500 w-full mb-2 hover:bg-purple-700">Manage Products</Link>

                      <button
                        onClick={handleLogout}
                        className="btn bg-blue-500 w-full hover:bg-blue-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <Link className="hover:bg-gray-400 btn" href="/login">Login</Link>
              <Link className="hover:bg-gray-400 btn" href="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
