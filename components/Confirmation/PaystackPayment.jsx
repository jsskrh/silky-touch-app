import axios from "axios";
import React, { useEffect, useState } from "react";
import { usePaystackPayment } from "react-paystack";

const PaystackPayment = ({
  saveOrder,
  totalPrice,
  email,
  handleError,
  successInit,
  style,
}) => {
  const [paystackKey, setPaystackKey] = useState(null);

  useEffect(() => {
    const loadPaystackScript = async () => {
      const { data: clientId } = await axios.get("api/keys/paystack");
      setPaystackKey(clientId);
    };
    loadPaystackScript();
  }, []);

  const onSuccess = (ref) => {
    try {
      successInit();
      const paymentResult = {
        id: ref.reference,
        status: ref.status,
        email_address: email,
      };
      saveOrder(paymentResult);
    } catch (error) {
      handleError(error);
    }
  };

  const paystackConfig = {
    ref: new Date().getTime().toString(),
    amount: totalPrice * 100,
    email,
    publicKey: paystackKey,
    // currency: "USD",
  };

  const initializePayment = usePaystackPayment(paystackConfig);

  return (
    <button
      className={`${style.button} ${style.continueButton}`}
      onClick={() => {
        initializePayment(onSuccess);
      }}
    >
      Confirm Order
    </button>
  );
};

export default PaystackPayment;
