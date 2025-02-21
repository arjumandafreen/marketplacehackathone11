"use client";

import { Menu, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartClicked, setCartClicked] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleCartClick = () => {
    setCartClicked(true);
  };

  // Hide cart message after 5 seconds
  useEffect(() => {
    if (cartClicked) {
      const timer = setTimeout(() => setCartClicked(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [cartClicked]);

  const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/shop", label: "Shop" },
    { href: "/price", label: "Price" },
    { href: "/contact", label: "Contact" },
    { href: "/productlist", label: "Product List" },
  ];

  return (
    <>
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            BANDAGE
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden sm:flex space-x-6 mx-auto">
            {navLinks.map((item, idx) => (
              <Link key={idx} href={item.href} className="px-4 py-2 rounded-full">
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right Side Icons and Buttons */}
          <div className="flex items-center space-x-6">
            {/* Shopping Cart Icon */}
            <ShoppingCart
              size={24}
              className="cursor-pointer"
              onClick={handleCartClick}
            />

            {/* Sign In / User Button */}
            <SignedOut>
              <SignInButton mode="modal">
                <h1 className="text-green-800 cursor-pointer font-bold">
                  Login/Register
                </h1>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="sm:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="sm:hidden flex flex-col items-center space-y-3 bg-white p-4">
            {navLinks.map((item, idx) => (
              <Link key={idx} href={item.href} className="text-black" onClick={toggleMenu}>
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>

      {/* Cart Message (Appears Only on Localhost, Disappears After 5 Seconds) */}
      {cartClicked && (
        <div className="mt-4 text-center">
          <h2 className="text-2xl font-semibold text-blue-600 animate-fade-out">
            Your cart is empty. Please visit the shop section.
          </h2>
        </div>
      )}
    </>
  );
}
