import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import CABenefits from "../components/Login/CABenefits";
import RememberMe from "../components/Login/RememberMe";
import { getError } from "../utils/error";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import CheckboxLayout from "../components/CheckboxLayout";

const style = {
  loginContainer: `bg-[#f5f5f5] mb-5 pb-16`,
  pageContent: `max-w-screen-md mx-auto text-sm`,
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

const register = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    getValues,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ name, email, password }) => {
    try {
      await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        // toast.error(result.error);
        console.log(result.error, "res");
      }
    } catch (error) {
      //   toast.error(getError(err));
      console.log(getError(error), "get");
    }
  };

  return (
    <Layout title="New User">
      <div className={style.loginContainer}>
        <TopContactUs />
        <PageTitle title="Registration" />
        <div className={style.pageContent}>
          <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit(submitHandler)}>
              <header className={style.formInstruction}>
                <span>* Required fields</span>
              </header>
              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="name">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", {
                    required: "Please enter your name",
                  })}
                  className={style.input}
                  autoFocus
                />
                {errors.name && (
                  <div className={style.errorMessage}>
                    {errors.name.message}
                  </div>
                )}
              </div>

              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="email">
                  Email Address *
                </label>
                <input
                  type="email"
                  {...register("email", {
                    required: "Please enter your Email Address",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                      message: "Please enter valid Email Address",
                    },
                  })}
                  className={style.input}
                  id="email"
                  autoFocus
                />
                {errors.email && (
                  <div className={style.errorMessage}>
                    {errors.email.message}
                  </div>
                )}
              </div>

              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="password">
                  Password *
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Please enter your password",
                    minLength: {
                      value: 6,
                      message: "Password is more than 5 characters",
                    },
                  })}
                  className={style.input}
                  id="password"
                  autoFocus
                />
                {errors.password && (
                  <div className={style.errorMessage}>
                    {errors.password.message}
                  </div>
                )}
              </div>

              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="confirmPassword">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === getValues("password"),
                    minLength: {
                      value: 6,
                      message: "Password is more than 5 characters",
                    },
                  })}
                  className={style.input}
                  autoFocus
                />
                {errors.confirmPassword && (
                  <div className={style.errorMessage}>
                    {errors.confirmPassword.message}
                  </div>
                )}
                {errors.confirmPassword &&
                  errors.confirmPassword.type === "validate" && (
                    <div className={style.errorMessage}>
                      Passwords do not match
                    </div>
                  )}
              </div>
              {/* <CheckboxLayout>
                I consent to commercial promotion activities related to Versace
                by e-mail and/or text messages according to our Privacy Policy.
              </CheckboxLayout> */}
              <div className={style.errorHandler}></div>
              <div className={style.loginButtonContainer}>
                <div className={style.buttonContainer}>
                  <button className={`${style.button} ${style.loginButton}`}>
                    Register
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default register;
