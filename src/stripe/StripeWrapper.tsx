"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeContainer from "./StripeContainer";
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
);
const StripeWrapper = () => {
  return (
    <Elements stripe={stripePromise}>
      <StripeContainer />
    </Elements>
  );
};

export default StripeWrapper;
