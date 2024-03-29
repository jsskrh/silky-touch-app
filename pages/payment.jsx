import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CheckboxLayout from "../components/CheckboxLayout";
import PaymentRadioGroup from "../components/Payment/PaymentRadioGroup";
import ShippingSummary from "../components/Payment/ShippingSummary";
import CheckoutProgress from "../components/Shipping/CheckoutProgress";
import OrderSummary from "../components/OrderSummary";
import { Store } from "../utils/Store";
import SecureLayout from "../components/Layout/SecureLayout";
import Empty from "../components/Bag/Empty";

const style = {
  pageContent: `md:flex text-xs`,
  leftSection: `flex-1`,
  header: `py-6 border-y w-full border-[#e6e6e6] flex justify-between`,
  headerTitle: `uppercase font-bold text-xs pl-1 inline-block`,
  paymentMethods: `mb-6`,
  errorMessage: `mt-1 text-[#bf2d2d]`,
  formInstruction: `inline-block`,
  checkboxContainer: `mb-9`,
  buttonContainer: `mb-8 md:w-1/2`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  continueButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
  rightSection: `md:ml-10 md:w-96`,
};

const payment = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const { shippingAddress, paymentMethod } = cart;

  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  const submitHandler = ({ paymentMethod }) => {
    dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
    Cookies.set(
      "cart",
      JSON.stringify({ ...cart, paymentMethod: paymentMethod })
    );
    router.push("/confirm-order");
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      return router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, [setValue, paymentMethod]);

  const roundCurrency = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const subtotal = roundCurrency(
    cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
  );
  const shippingPrice = roundCurrency(0);
  const tax = roundCurrency(0);
  const totalPrice = roundCurrency(subtotal + shippingPrice + tax);

  return (
    <SecureLayout title="Payment & Billing | Checkout">
      <div className={style.paymentContainer}>
        {cartItems.length === 0 ? (
          <div className={style.emptyBag}>
            <Empty title="Bag Empty." text="You have 0 items in your bag" />
          </div>
        ) : (
          <>
            <CheckoutProgress activeStep={2} />
            <div className={style.pageContent}>
              <div className={style.leftSection}>
                <form onSubmit={handleSubmit(submitHandler)}>
                  <div className={style.header}>
                    <h2 className={style.headerTitle}>Payment Method</h2>
                    <div className={style.formInstruction}>
                      <span>* Required fields</span>
                    </div>
                  </div>

                  <div className={style.paymentMethods}>
                    <Controller
                      name="paymentMethod"
                      control={control}
                      defaultValue=""
                      rules={{
                        required: "Please select a payment method",
                      }}
                      render={({ field }) => <PaymentRadioGroup {...field} />}
                    />
                    {errors.paymentMethod && (
                      <div className={style.errorMessage}>
                        {errors.paymentMethod.message}
                      </div>
                    )}
                  </div>

                  <div className={style.checkboxContainer}>
                    <CheckboxLayout id="consentAds">
                      I consent to commercial promotion activities related to
                      Luxury by e-mail and/or text messages according to our{" "}
                      <Link href="/privacy-policy">
                        <span>Privacy Policy</span>
                      </Link>
                      .
                    </CheckboxLayout>
                  </div>

                  <div className={style.checkboxContainer}>
                    <CheckboxLayout id="consentProfiling">
                      I consent to profiling activities to obtain offers based
                      on my preferences.
                    </CheckboxLayout>
                  </div>

                  <div className={style.checkboxContainer}>
                    <p>
                      By placing an order, you confirm that you agree to the{" "}
                      <Link href="/terms-conditions">
                        <span>Terms & Conditions</span>
                      </Link>{" "}
                      and have read and understood the Silky Touch{" "}
                      <Link href="/privacy-policy">
                        <span>Privacy Policy</span>
                      </Link>
                      .
                    </p>
                  </div>

                  <div className={style.buttonContainer}>
                    <button
                      className={`${style.button} ${style.continueButton}`}
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>

              <div className={style.rightSection}>
                <OrderSummary
                  subtotal={subtotal}
                  shippingPrice={shippingPrice}
                  totalPrice={totalPrice}
                  tax={tax}
                />
                <ShippingSummary />
              </div>
            </div>
          </>
        )}
      </div>
    </SecureLayout>
  );
};

payment.auth = true;

export default payment;
