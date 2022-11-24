import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CheckboxLayout from "../components/CheckboxLayout";
import Layout from "../components/Layout/Layout";
import CheckoutProgress from "../components/CheckoutProgress";
import OrderSummary from "../components/OrderSummary";
import { Store } from "../utils/Store";
import PrefixBox from "../components/Shipping/PrefixBox";
import CountryBox from "../components/Shipping/CountryBox";
import InputContainer from "../components/Shipping/InputContainer";
import SecureLayout from "../components/Layout/SecureLayout";

const style = {
  pageContent: `md:flex text-xs`,
  leftSection: `flex-1`,
  header: `py-6 border-t w-full border-[#e6e6e6]`,
  headerTitle: `uppercase font-bold text-xs pl-1`,
  checkoutPanel: `pt-6 pb-10 border-t border-[#e6e6e6]`,
  formInstruction: `flex justify-end`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  checkboxContainer: `mb-9`,
  buttonContainer: `mb-8 w-1/2`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  continueButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
  rightSection: `md:ml-10 md:w-96`,
};

const shipping = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;
  const { shippingAddress } = cart;

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    control,
  } = useForm();

  useEffect(() => {
    setValue("firstName", shippingAddress.firstName);
    setValue("lastName", shippingAddress.lastName);
    setValue("address", shippingAddress.address);
    setValue("phoneNumber", shippingAddress.phoneNumber);
    setValue("prefix", shippingAddress.prefix);
    setValue("country", shippingAddress.country);
    setValue("postalCode", shippingAddress.postalCode);
  }, [setValue, shippingAddress]);

  const submitHandler = ({
    firstName,
    lastName,
    address,
    phoneNumber,
    postalCode,
    prefix,
    country,
  }) => {
    dispatch({
      type: "SAVE_SHIPPING_ADDRESS",
      payload: {
        firstName,
        lastName,
        address,
        phoneNumber,
        postalCode,
        country,
        prefix,
      },
    });
    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingAddress: {
          firstName,
          lastName,
          address,
          phoneNumber,
          postalCode,
          country,
          prefix,
        },
      })
    );
    router.push("/payment");
  };

  const roundCurrency = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const subtotal = roundCurrency(
    cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
  );
  const estimatedShipping = roundCurrency(0);
  const estimatedTotal = roundCurrency(subtotal + estimatedShipping);

  return (
    <SecureLayout title="Delivery Details | Checkout">
      <div className={style.checkoutContainer}>
        <CheckoutProgress activeStep={1} />
        <div className={style.pageContent}>
          <div className={style.leftSection}>
            <form onSubmit={handleSubmit(submitHandler)}>
              <legend className={style.header}>
                <h2 className={style.headerTitle}>Shipping Address</h2>
              </legend>
              <div className={style.checkoutPanel}>
                <div className={style.formInstruction}>
                  <span>* Required fields</span>
                </div>
                <div className={style.shippingAddressContainer}>
                  <InputContainer
                    id="title"
                    label="Title"
                    error={errors.prefix && errors.prefix.message}
                  >
                    <Controller
                      name="prefix"
                      control={control}
                      defaultValue="Please select"
                      rules={{
                        required: "Please select a prefix",
                        validate: (value) =>
                          value !== "Please select" || "Please select a prefix",
                      }}
                      render={({ field }) => <PrefixBox {...field} />}
                    />
                  </InputContainer>

                  <InputContainer
                    id="firstName"
                    label="First Name"
                    error={errors.firstName && errors.firstName.message}
                  >
                    <input
                      type="text"
                      className={style.input}
                      id="firstName"
                      autoFocus
                      placeholder="Please enter your first name"
                      {...register("firstName", {
                        required: "Please enter your first name",
                      })}
                    />
                  </InputContainer>

                  <InputContainer
                    id="lastName"
                    label="Last Name"
                    error={errors.lastName && errors.lastName.message}
                  >
                    <input
                      type="text"
                      className={style.input}
                      id="lastName"
                      autoFocus
                      placeholder="Please enter your last name"
                      {...register("lastName", {
                        required: "Please enter your last name",
                      })}
                    />
                  </InputContainer>

                  <InputContainer
                    id="phoneNumber"
                    label="Phone Number"
                    error={errors.phoneNumber && errors.phoneNumber.message}
                  >
                    <input
                      type="text"
                      className={style.input}
                      id="phoneNumber"
                      autoFocus
                      placeholder="Please enter your phone number"
                      {...register("phoneNumber", {
                        required: "Please enter your phone number",
                      })}
                    />
                  </InputContainer>

                  <InputContainer
                    id="country"
                    label="Country or Region"
                    error={errors.country && errors.country.message}
                  >
                    <Controller
                      name="country"
                      control={control}
                      defaultValue="Please select"
                      rules={{
                        required: "Please select a country",
                        validate: (value) =>
                          value !== "Please select" ||
                          "Please enter your country",
                      }}
                      render={({ field }) => <CountryBox {...field} />}
                    />
                  </InputContainer>

                  <InputContainer
                    id="address"
                    label="Address"
                    error={errors.address && errors.address.message}
                  >
                    <input
                      type="text"
                      className={style.input}
                      id="address"
                      autoFocus
                      placeholder="Please enter your address"
                      {...register("address", {
                        required: "Please enter your address",
                        minLength: {
                          value: 7,
                          message: "Address is more than 6 characters",
                        },
                      })}
                    />
                  </InputContainer>

                  <InputContainer
                    id="postalCode"
                    label="Postal Code"
                    error={errors.postalCode && errors.postalCode.message}
                  >
                    <input
                      type="text"
                      className={style.input}
                      id="postalCode"
                      autoFocus
                      placeholder="Please enter your postal code"
                      {...register("postalCode", {
                        required: "Please enter your postal code",
                        minLength: {
                          value: 6,
                          message: "Postal Code is more than 5 characters",
                        },
                      })}
                    />
                  </InputContainer>
                </div>
              </div>

              <div className={style.checkboxContainer}>
                <CheckboxLayout id="useSaAsBa">
                  Use this shipping address as your billing address
                </CheckboxLayout>
              </div>

              <div className={style.buttonContainer}>
                <button className={`${style.button} ${style.continueButton}`}>
                  Continue
                </button>
              </div>
            </form>
          </div>

          <div className={style.rightSection}>
            <OrderSummary
              subtotal={subtotal}
              estimatedShipping={estimatedShipping}
              estimatedTotal={estimatedTotal}
            />
          </div>
        </div>
      </div>
    </SecureLayout>
  );
};

shipping.auth = true;

export default shipping;
