"use client"; // Ensures this runs only on the client side in Next.js

import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "./action";
import { useRouter } from "next/navigation";

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    createPaymentIntent().then((res) => {
      setClientSecret(res.clientSecret);
    });
  }, []);

  if (!clientSecret) {
    return <div className="text-center text-lg font-semibold">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Payment Form</h1>
      
      <Elements stripe={stripePromise} options={{ clientSecret }}>
        <PaymentForm />
      </Elements>
    </div>
  );
}

// Payment Form Component
function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "An unknown error occurred");
      setIsProcessing(false);
    } else {
      setErrorMessage(null);
      setIsProcessing(false);
      router.push("/payment-success");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement className="p-3 border rounded-md bg-gray-50" />

      <button 
        className="w-full bg-pink-700 text-white py-3 rounded-md font-semibold hover:bg-pink-800 transition-all duration-200"
        type="submit"
        disabled={!stripe || isProcessing}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      {errorMessage && <div className="text-red-500 text-sm text-center">{errorMessage}</div>}
    </form>
  );
}

