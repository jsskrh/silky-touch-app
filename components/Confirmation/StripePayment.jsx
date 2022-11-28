import { loadStripe } from "@stripe/stripe-js/pure";
import axios from "axios";
import React, { useEffect } from "react";

let stripePromise;
const loadStripeScript = async () => {
  const { data } = await axios.get("api/keys/stripe");
  stripePromise = await loadStripe(data);
  return stripePromise;
};

const StripePayment = ({
  loading,
  style,
  saveOrder,
  successInit,
  handleError,
  totalPrice,
  setLoading,
  router,
}) => {
  const createCheckOutSession = async () => {
    setLoading(true);
    const checkoutSession = await axios.post(
      "/api/sessions/stripe/create-stripe-session",
      {
        amount: totalPrice * 100,
      }
    );

    if (checkoutSession.statusCode === 500) {
      console.error(checkoutSession.message);
      return;
    }

    // Redirect to Checkout.
    const stripe = await loadStripeScript();
    const { error } = await stripe.redirectToCheckout({
      // Make the id field from the Checkout Session creation API response
      // available to this file, so you can provide it as parameter here
      // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
      sessionId: await checkoutSession.data.id,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
    console.warn(error.message);
    // const result = await stripe.redirectToCheckout({
    //   sessionId: checkoutSession.data.id,
    // });
    // if (result.error) {
    //   alert(result.error.message);
    // }
    setLoading(false);
  };

  useEffect(() => {
    if (!router.query.session_id) {
      return;
    }
    setLoading(true);
    successInit();
    const data = async () => {
      try {
        const { data } = await axios.post(
          `/api/sessions/stripe/${router.query.session_id}`
        );
        const paymentResult = {
          id: data.id,
          email_address: data.customer_details.email,
          status: data.payment_intent.status,
        };
        saveOrder(paymentResult);
      } catch (error) {
        handleError(error);
      }
    };
    data();
    setLoading(false);
  }, [router]);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <button
          className={`${style.button} ${style.continueButton}`}
          onClick={() => {
            createCheckOutSession();
          }}
        >
          Confirm Order
        </button>
      )}
    </>
  );
};

export default StripePayment;
