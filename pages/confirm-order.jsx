import { useRouter } from "next/router";
import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import CheckoutProgress from "../components/Shipping/CheckoutProgress";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import ShippingSummary from "../components/Payment/ShippingSummary";
import PaymentMethod from "../components/Confirmation/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import SecureCheckoutLayout from "../components/Layout/SecureLayout";
import BagEmpty from "../components/Bag/BagEmpty";
import PaystackPayment from "../components/Confirmation/PaystackPayment";
import PaypalPayment from "../components/Confirmation/PaypalPayment";
import StripePayment from "../components/Confirmation/StripePayment";

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

const confirmation = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;
  const router = useRouter();

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

  const email = "qwerty@qwerty.com";

  return (
    <SecureCheckoutLayout title="Confirmation | Checkout">
      <div>
        {cartItems.length === 0 ? (
          <div className={style.emptyBag}>
            <BagEmpty />
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
                      email={email}
                      style={style}
                    />
                  ) : (
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
