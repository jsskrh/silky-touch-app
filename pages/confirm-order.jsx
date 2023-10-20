import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import {
//   useMonnifyPayment,
//   MonnifyButton,
//   MonnifyConsumer,
//   MonnifyHookExample,
// } from "react-monnify";
import CheckoutProgress from "../components/Shipping/CheckoutProgress";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import ShippingSummary from "../components/Payment/ShippingSummary";
import PaymentMethod from "../components/Confirmation/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import SecureCheckoutLayout from "../components/Layout/SecureLayout";
import PaystackPayment from "../components/Confirmation/PaystackPayment";
import PaypalPayment from "../components/Confirmation/PaypalPayment";
import StripePayment from "../components/Confirmation/StripePayment";
// import MonnifyPayment from "../components/Confirmation/MonnifyPayment";
import CCPayment from "../components/Confirmation/CCPayment";
import Empty from "../components/Bag/Empty";

function reducer(state, action) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loadingPay: true };
      break;

    case "PAY_SUCCESS":
      return { ...state, loadingPay: false, successPay: true };
      break;

    case "PAY_FAIL":
      return { ...state, loadingPay: false, errorPay: action.payload };
      break;

    case "PAY_RESET":
      return { ...state, loadingPay: false, successPay: false, errorPay: "" };
      break;

    default:
      state;
  }
}

const style = {
  pageContent: `grid grid-cols-1 md:grid-cols-4`,
  emptyBag: `mt-[25vh]`,
  leftSection: `md:col-span-3 md:mr-10`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  continueButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const amount = 5000;
const currency = "NGN";
const reference = "" + Math.floor(Math.random() * 1000000000 + 1);
const customerFullName = "John Doe";
const customerEmail = "monnify@monnify.com";
const customerMobileNumber = "08121281921";
const apiKey = "MK_TEST_490NQEUF58";
const contractCode = "5177040622";
// const paymentDescription = "Lahray World";
const paymentDescription = "Test Pay";
const isTestMode = true;
const metadata = {
  name: "Damilare",
  age: 45,
};

const confirmation = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const router = useRouter();

  const { status, data: session } = useSession();

  const [loading, setLoading] = useState(false);

  const [{ loadingPay, successPay }, reducerDispatch] = useReducer(reducer, {});

  useEffect(() => {
    if (!paymentMethod) {
      router.push("./payment");
    }
  }, [paymentMethod, router]);

  const roundCurrency = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const subtotal = roundCurrency(
    cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
  );
  const shippingPrice = roundCurrency(0);
  const tax = roundCurrency(0);
  const totalPrice = roundCurrency(subtotal + shippingPrice + tax);

  const saveOrder = async (paymentResult) => {
    const { data } = await axios.post("/api/orders", {
      orderItems: cartItems,
      shippingAddress,
      paymentMethod,
      subtotal,
      shippingPrice,
      tax,
      totalPrice,
      paymentResult,
    });
    await axios.post("/api/mail/order", {
      data,
    });
    await axios.post("/api/mail/order-support", {
      data,
    });
    setLoading(true);
    router.push(`/orders/${data._id}`);
    reducerDispatch({ type: "PAY_SUCCESS", payload: data });
    dispatch({ type: "CART_CLEAR_ITEMS" });
    Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
  };

  const successInit = () => {
    dispatch({ type: "PAY_REQUEST" });
  };

  const handleError = (error) => {
    reducerDispatch({ type: "PAY_FAIL", payload: getError(error) });
    console.log(getError(error));
  };

  const email = "qwert@qwerty.com";

  const onComplete = (response) => {
    console.log(response); // card charged successfully, get reference here
  };

  const close = (response) => {
    console.log(response);
  };

  const config = {
    amount: 100,
    currency: "NGN",
    reference: `${new String(new Date().getTime())}`,
    customerName: "Damilare Ogunnaike",
    customerEmail: "ogunnaike.damilare@gmail.com",
    apiKey: "MK_PROD_FLX4P92EDF",
    contractCode: "626609763141",
    paymentDescription: "Lahray World",
    metadata: {
      name: "Damilare",
      age: 45,
    },
    isTestMode: true,
    customerPhoneNumber: "09123856264",
  };

  const componentProps = {
    options: config,
    text: "Pay With Monnify Button example",
    className: "btn",
    onLoadStart: () => {
      console.log("loading has started");
    },
    onLoadComplete: () => {
      console.log("SDK is UP");
    },

    onComplete: function (response) {
      //Implement what happens when the transaction is completed.
      console.log("response", response);
    },
    onClose: function (data) {
      //Implement what should happen when the modal is closed here
      console.log("data", data);
    },
  };

  return (
    <SecureCheckoutLayout title="Confirmation | Checkout">
      <div>
        {cartItems.length === 0 ? (
          <div className={style.emptyBag}>
            <Empty title="Bag Empty." text="You have 0 items in your bag" />
          </div>
        ) : (
          <>
            <CheckoutProgress activeStep={3} />
            <div className={style.pageContent}>
              <div className={style.leftSection}>
                <OrderSummary
                  confirmation
                  subtotal={subtotal}
                  shippingPrice={shippingPrice}
                  totalPrice={totalPrice}
                  tax={tax}
                />
              </div>
              <div className={style.rightSection}>
                <ShippingSummary />
                <PaymentMethod />
                <div className={style.buttonContainer}>
                  {paymentMethod === "Paypal" ? (
                    <PaypalPayment
                      saveOrder={saveOrder}
                      handleError={handleError}
                      successInit={successInit}
                      setLoading={setLoading}
                      loading={loading}
                      loadingPay={loadingPay}
                      successPay={successPay}
                      totalPrice={totalPrice}
                      style={style}
                    />
                  ) : paymentMethod === "Paystack" ? (
                    <PaystackPayment
                      saveOrder={saveOrder}
                      handleError={handleError}
                      successInit={successInit}
                      totalPrice={totalPrice}
                      email={session.user.email}
                      style={style}
                    />
                  ) : // ) : paymentMethod === "Monniepoint" ? (
                  //   <MonnifyButton
                  //     text="Make Payment"
                  //     className="payButton"
                  //     onComplete={onComplete}
                  //     close={close}
                  //     disabled={true} // disable payment button
                  //     embed={true} // payment embed in your app instead of a pop up
                  //     customerFullName={customerFullName}
                  //     customerEmail={customerEmail}
                  //     customerMobileNumber={customerMobileNumber}
                  //     paymentDescription={paymentDescription}
                  //     amount={amount}
                  //     apiKey={apiKey}
                  //     contractCode={contractCode}
                  //     reference={reference}
                  //     tag="button" // it can be button or a or input tag
                  //   />
                  paymentMethod === "Stripe" ? (
                    <StripePayment
                      saveOrder={saveOrder}
                      handleError={handleError}
                      successInit={successInit}
                      router={router}
                      totalPrice={totalPrice}
                      setLoading={setLoading}
                      loading={loading}
                      style={style}
                    />
                  ) : (
                    <CCPayment
                      saveOrder={saveOrder}
                      successInit={successInit}
                      router={router}
                      email={session.user.email}
                      totalPrice={totalPrice}
                      setLoading={setLoading}
                      loading={loading}
                      style={style}
                    />
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </SecureCheckoutLayout>
  );
};

confirmation.auth = true;

export default confirmation;
