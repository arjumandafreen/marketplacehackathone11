
"use client";

import { useEffect, useReducer, useState } from "react";
import Swal from "sweetalert2";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export default function CartPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setProducts(Array.isArray(cart) ? cart : Object.values(cart));
    } catch (error) {
      console.error("Error parsing cart data:", error);
      setProducts([]);
    }
  }, []);

  const updateLocalStorage = (updatedCart: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (name: string, change: number) => {
    const updatedCart = products
      .map((product) =>
        product.name === name
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      )
      .filter((product) => product.quantity > 0);
    setProducts(updatedCart);
    updateLocalStorage(updatedCart);
  };

  const handleRemove = (name: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = products.filter((product) => product.name !== name);
        setProducts(updatedCart);
        updateLocalStorage(updatedCart);
        Swal.fire("Removed!", "Item has been removed from your cart.", "success");
      }
    });
  };
  const router = useRouter();
  const handleCheckout = () => {
    Swal.fire({
      title:"Proceed to checkout...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Proceed successfully!", "Redirecting...", "success");
        router.push("/checkout");
        setProducts([]);

        localStorage.removeItem("cart,checkout");
      }
    });
  };

  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const discount = total * 0.2; // 20% discount
  const deliveryFee = 15;
  const finalTotal = total - discount + deliveryFee;

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen justify-center items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-gray-500 mb-4 text-lg">Happy To See You Here</p>
          <a
            href="/checkout"
            className="px-6 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-all duration-200"
          >
            checkout plz😊
          </a>
          <a
            href="/shop"
            className="mt-4 px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-all duration-200"
          >
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg">
              {/* Image & Product Details */}
              <div className="flex items-center space-x-4">
                <Image
                  src={product.image} // Directly using image source
                  alt={product.name}
                  width={80}
                  height={80}
                  className="rounded"
                  onError={(e) => (e.currentTarget.src = "/fallback-image.png")} // Fallback image if error
                />
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 mt-8 md:mt-0">
                <button
                  onClick={() => handleQuantityChange(product.name, -1)}
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
                >
                  -
                </button>
                <span className="font-semibold text-gray-700">{product.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(product.name, 1)}
                  className="bg-gray-200 text-gray-600 px-3 py-1 rounded hover:bg-gray-300"
                >
                  +
                </button>
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleRemove(product.name)}
                className="text-red-500 hover:text-red-700 font-semibold mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="bg-white p-4 shadow rounded-lg space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Discount (20%)</span>
              <span className="font-semibold text-red-500">-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="font-semibold">${deliveryFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="bg-purple-600 text-white font-bold py-2 rounded-lg w-full hover:bg-purple-800 transition-all duration-200"
          >
            <a
            href="/checkout"
            className="bg-green-600 text-white font-bold py-2 rounded-lg w-full hover:bg-red-800 transition-all duration-200"
          >
           
          
          Go to Checkout
          </a> 
          </button>
           <br></br>
           <br></br>
          {/* Shop more link */}
          <a
            href="/shop"
            className="bg-green-600 text-white font-bold py-2 rounded-lg w-full hover:bg-red-800 transition-all duration-200"
          >
            Continue Shopping
          </a>
        </div>
      )}
    </div>
  );
}
