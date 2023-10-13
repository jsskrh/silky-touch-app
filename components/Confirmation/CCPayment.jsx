import { loadStripe } from "@stripe/stripe-js/pure";
import axios from "axios";
import React, { useEffect } from "react";

const CCPayment = ({
  loading,
  style,
  saveOrder,
  successInit,
  handleError,
  totalPrice,
  setLoading,
  router,
  email,
}) => {
  const checkout = async () => {
    setLoading(true);
    successInit();
    const paymentResult = {
      id: null,
      status: null,
      email_address: email,
    };
    saveOrder(paymentResult);
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <button
          className={`${style.button} ${style.continueButton}`}
          onClick={() => {
            checkout();
          }}
        >
          Confirm Order
        </button>
      )}
    </>
  );
};

export default CCPayment;
