import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import CheckoutProgress from "../components/CheckoutProgress";
import { getError } from "../utils/error";
import { Store } from "../utils/Store";
import Cookies from "js-cookie";
import ShippingSummary from "../components/Payment/ShippingSummary";
import PaymentMethod from "../components/Confirmation/PaymentMethod";
import OrderSummary from "../components/OrderSummary";
import SecureCheckoutLayout from "../components/Layout/SecureLayout";

const style = {
  pageContent: `grid grid-cols-1 md:grid-cols-4`,
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

  const confirmOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/orders", {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        subtotal,
        shippingPrice,
        tax,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: "CART_CLEAR_ITEMS" });
      Cookies.set("cart", JSON.stringify({ ...cart, cartItems: [] }));
      router.push(`/orders/${data._id}`);
    } catch (error) {
      setLoading(false);
      console.log(getError(error));
    }
  };

  return (
    <SecureCheckoutLayout title="Confirmation | Checkout">
      <div>
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
              <button
                className={`${style.button} ${style.continueButton}`}
                onClick={confirmOrderHandler}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </SecureCheckoutLayout>
  );
};

confirmation.auth = true;

export default confirmation;
