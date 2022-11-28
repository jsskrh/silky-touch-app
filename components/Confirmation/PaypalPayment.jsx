import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from "axios";
import React, { useEffect } from "react";

const PaypalPayment = ({
  saveOrder,
  handleError,
  successInit,
  loadingPay,
  successPay,
  totalPrice,
  setLoading,
  loading,
  style,
}) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  useEffect(() => {
    const loadPaypalScript = async () => {
      const { data: clientId } = await axios.get("api/keys/paypal");
      paypalDispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          currency: "USD",
        },
      });
      paypalDispatch({ type: "setLoadingStatus", value: "pending" });
    };
    loadPaypalScript();
  }, [paypalDispatch, successPay]);

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [{ amount: { value: totalPrice } }],
      })
      .then((orderID) => {
        return orderID;
      });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async (details) => {
      try {
        setLoading(true);
        successInit();
        // const { data } = await axios.put(
        //   `/api/orders/${order._id}/pay`,
        //   details
        // );
        const paymentResult = {
          id: details.id,
          status: details.status,
          email_address: details.payer.email_address,
        };
        saveOrder(paymentResult);
      } catch (error) {
        handleError(error);
      }
    });
  };

  const onError = (error) => {
    console.log(getError(error));
  };

  return (
    <>
      {isPending ? (
        <div>Loading...</div>
      ) : (
        <PayPalButtons
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        ></PayPalButtons>
      )}
      {loadingPay && <div>Loading</div>}
    </>
  );
};

export default PaypalPayment;
