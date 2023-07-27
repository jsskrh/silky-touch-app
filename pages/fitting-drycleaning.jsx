import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";
import ProfileCard from "../components/Profile/ProfileCard";
import Logout from "../components/Profile/Logout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
// import { useForm } from "react-hook-form";
import CABenefits from "../components/Login/CABenefits";
import RememberMe from "../components/Login/RememberMe";
import { getError } from "../utils/error";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import CheckboxLayout from "../components/CheckboxLayout";
import PrefixBox from "../components/Shipping/PrefixBox";
import InputContainer from "../components/Shipping/InputContainer";

const style = {
  loginContainer: `mb-5 pb-16`,
  pageContent: `max-w-screen-md mx-auto text-sm`,
  form: `mx-5`,
  formInstruction: `flex justify-end`,
  inputContainer: `mb-5`,
  label: `mb-[5px]`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#f5f5f5] hover:border-[#515151]`,
  errorMessage: `mt-1 text-[#bf2d2d]`,
  errorHandler: `pb-7`,
  headerText: `pb-14 uppercase text-sm font-bold`,
  buttonContainer: `mb-8`,
  loginButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  buttonLink: `mt-9 flex justify-center`,
  buttonLinkText: `text-[#212121] hover:text-[#515151] underline transition-all`,
};

const fittingDrycleaning = () => {
  const [isMobile, setIsMobile] = useState();
  const router = useRouter();

  const {
    handleSubmit,
    register,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({
    firstName,
    lastName,
    phoneNumber,
    prefix,
    email,
    description,
  }) => {
    try {
      const data = {
        firstName,
        lastName,
        phoneNumber,
        prefix,
        email,
        description,
      };

      await axios.post("/api/mail/request", {
        data,
      });

      reset({
        firstName: "",
        prefix: "",
        lastName: "",
        phoneNumber: "",
        email: "",
        description: "",
      });
    } catch (error) {
      //   toast.error(getError(err));
      console.log(getError(error), "get");
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout title="Fitting and Drycleaners" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Fitting and Drycleaners" />
        <div className={style.pageContent}>
          <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit(submitHandler)}>
              <header className={style.formInstruction}>
                <span>* Required fields</span>
              </header>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <InputContainer
                  id="firstName"
                  label="First Name"
                  error={errors.firstName && errors.firstName.message}
                  fullWidth
                >
                  <input
                    type="text"
                    className={`${style.input}`}
                    id="firstName"
                    // placeholder="Please enter your first name"
                    {...register("firstName", {
                      required: "Please enter your first name",
                    })}
                  />
                </InputContainer>

                <InputContainer
                  id="lastName"
                  label="Last Name"
                  error={errors.lastName && errors.lastName.message}
                  fullWidth
                >
                  <input
                    type="text"
                    className={style.input}
                    id="lastName"
                    // placeholder="Please enter your last name"
                    {...register("lastName", {
                      required: "Please enter your last name",
                    })}
                  />
                </InputContainer>

                <InputContainer
                  id="phoneNumber"
                  label="Phone Number"
                  error={errors.phoneNumber && errors.phoneNumber.message}
                  fullWidth
                >
                  <input
                    type="text"
                    className={style.input}
                    id="phoneNumber"
                    // placeholder="Please enter your phone number"
                    {...register("phoneNumber", {
                      required: "Please enter your phone number",
                    })}
                  />
                </InputContainer>

                <InputContainer
                  id="email"
                  label="Email Address"
                  error={errors.email && errors.email.message}
                  fullWidth
                >
                  <input
                    type="email"
                    className={style.input}
                    id="email"
                    // placeholder="Please enter your email"
                    {...register("email", {
                      required: "Please enter your email",
                    })}
                  />
                </InputContainer>
              </div>

              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="description">
                  Description *
                </label>
                <textarea
                  type="text"
                  {...register("description", {
                    required: "Please write a description",
                    // minLength: {
                    //   value: 6,
                    //   message: "Password is more than 5 characters",
                    // },
                  })}
                  className={style.input}
                  id="description"
                  autoFocus
                ></textarea>
                {errors.description && (
                  <div className={style.errorMessage}>
                    {errors.description.message}
                  </div>
                )}
              </div>

              <div className={style.errorHandler}></div>
              <div className={style.loginButtonContainer}>
                <div className={style.buttonContainer}>
                  <button className={`${style.button} ${style.loginButton}`}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export default fittingDrycleaning;
