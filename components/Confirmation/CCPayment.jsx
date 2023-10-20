import { useEffect } from "react";
import LoadingSpinner from "../LoadingSpinner";

const CCPayment = ({
  loading,
  style,
  saveOrder,
  successInit,
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
  };

  return (
    <>
      <button
        className={`${style.button} ${style.continueButton}`}
        onClick={() => {
          checkout();
        }}
        disabled={loading}
      >
        {loading ? <LoadingSpinner /> : "Confirm Order"}
      </button>
    </>
  );
};

export default CCPayment;
