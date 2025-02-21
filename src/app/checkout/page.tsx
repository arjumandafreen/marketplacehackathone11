
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Swal from "sweetalert2";
import { client } from "@/sanity/lib/client";

interface Product {
  _id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export default function Checkout() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    address: false,
    city: false,
    zipCode: false,
    phone: false,
    email: false,
  });

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

  const handleCheckout = () => {
    Swal.fire({
      title: "Proceed to checkout...",
      text: "Please wait a moment.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Order placed successfully!", "Redirecting...", "success");
        setProducts([]);
        localStorage.removeItem("cart");
        router.push("/checkout");
      }
    });
  };

  const total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const discount = total * 0.2; // 20% discount
  const deliveryFee = 15;
  const finalTotal = total - discount + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const errors: any = {};
    for (const field in formValues) {
      if (!formValues[field as keyof typeof formValues]) {
        errors[field] = true;
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Prepare the order data to send to Sanity
      const orderData = {
        _type: "order", // Specify the document type
        lastName: formValues.lastName,
        address: formValues.address,
        city: formValues.city,
        zipCode: formValues.zipCode,
        phone: formValues.phone,
        email: formValues.email,
        cartItems: products.map((item) => ({
          _type: "reference", // Reference each product
          _ref: item._id,
        })),
        total: total,
        discount: discount,
        orderDate: new Date().toISOString(),
      };

      try {
        // Create the order document in Sanity
        await client.create(orderData);
        localStorage.removeItem("appliedDiscount");
        Swal.fire("Order placed successfully!", "Thank you for your purchase.", "success");
      } catch (error) {
        console.error("Error creating order", error);
       // Swal.fire("An error occurred", "Please try again later.", "error");
      }
   // } else {
      //Swal.fire("Please fill in all fields", "All fields are required.", "error");
    }
  };

  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 min-h-screen justify-center items-center">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {products.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-center text-gray-500 mb-4 text-lg">Happy To See You Here</p>
          <Link href="/shop" className="px-6 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-all duration-200">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto space-y-6">
          {products.map((product) => (
            <div key={product._id} className="flex flex-col md:flex-row items-center justify-between bg-white p-4 shadow rounded-lg">
              <div className="flex items-center space-x-4">
                <Image src={product.image} alt={product.name} width={80} height={80} className="rounded" />
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                </div>
              </div>

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

              <button
                onClick={() => handleRemove(product.name)}
                className="text-red-500 hover:text-red-700 font-semibold mt-4 md:mt-0"
              >
                Remove
              </button>
            </div>
          ))}

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

          
        </div>
      )}

      {/* Billing Form */}
      <div className="bg-pink-200 border rounded-lg p-6 space-y-6 mt-6">
        <h2 className="text-xl font-semibold">Payment Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              placeholder="Enter your first name"
              value={formValues.firstName}
              onChange={handleInputChange}
              className="border"
            />
            {formErrors.firstName && <p className="text-sm text-red-500">First name is required.</p>}
          </div>
          <div>
          <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              placeholder="Enter your last name"
              value={formValues.lastName}
              onChange={handleInputChange}
              className="border"
            />
            {formErrors.lastName && <p className="text-sm text-red-500">Last name is required.</p>}
          </div>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            placeholder="Enter your address"
            value={formValues.address}
            onChange={handleInputChange}
            className="border"
          />
          {formErrors.address && <p className="text-sm text-red-500">Address is required.</p>}
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            id="city"
            placeholder="Enter your city"
            value={formValues.city}
            onChange={handleInputChange}
            className="border"
          />
          {formErrors.city && <p className="text-sm text-red-500">City is required.</p>}
        </div>
        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            placeholder="Enter your zip code"
            value={formValues.zipCode}
            onChange={handleInputChange}
            className="border"
          />
          {formErrors.zipCode && <p className="text-sm text-red-500">Zip Code is required.</p>}
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            placeholder="Enter your phone number"
            value={formValues.phone}
            onChange={handleInputChange}
            className="border"
          />
          {formErrors.phone && <p className="text-sm text-red-500">Phone is required.</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            placeholder="Enter your email address"
            value={formValues.email}
            onChange={handleInputChange}
            className="border"
          />
          {formErrors.email && <p className="text-sm text-red-500">Email is required.</p>}
        </div>

        <br></br>
        <Link
      href="/payment"
      className="px-6 py-3 text-white bg-pink-500 hover:bg-green-600 rounded-lg shadow-md transition-all duration-200"
    >
                      Pay Your Amount Please
    </Link>
  

      </div>
    </div>
  );
}      