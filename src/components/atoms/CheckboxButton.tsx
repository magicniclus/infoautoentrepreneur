"use client";

import { loadStripe } from "@stripe/stripe-js";
import Script from "next/script";

const CheckboxButton = () => {
  const handleCheckout = async () => {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();

    // Charge Stripe
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
    );

    // Redirige vers la caisse
    if (stripe) {
      await stripe.redirectToCheckout({ sessionId: data.sessionId });
    }
  };

  return (
    <>
      <Script src="https://js.stripe.com/v3/"></Script>
      <button onClick={handleCheckout}>Acheter maintenant</button>
    </>
  );
};

export default CheckboxButton;
