import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { signIn, useSession } from "next-auth/react";
import CABenefits from "../components/Login/CABenefits";
import RememberMe from "../components/Login/RememberMe";
import { getError } from "../utils/error";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const style = {
  loginContainer: `mb-5 pb-16`,
  pageContent: `flex md:flex-row flex-col max-w-screen-md mx-auto text-sm`,
  formContainer: `md:border-r md:pr-8 lg:pr-16 border-[#dcdcdc] md:w-1/2 mx-5 md:mr-0 lg:mx-0 pb-3 border-b mb-5 md:pb-0 md:border-b-0 md:mb-0`,
  inputContainer: `mb-5`,
  label: `mb-[5px]`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#f5f5f5] hover:border-[#515151]`,
  errorMessage: `mt-1 text-[#bf2d2d]`,
  errorHandler: `pb-7`,
  headerText: `pb-14 uppercase text-sm font-bold text-center md:text-start`,
  caContainer: `md:pl-8 lg:pl-16 md:w-1/2 flex flex-col mx-5 md:ml-0 lg:mx-0`,
  boxContent: `flex flex-col justify-between grow`,
  buttonContainer: `mb-8`,
  loginButton: `bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
  createButton: `hover:bg-[#212121] hover:text-[#fafafa] text-[#212121] border-[#212121] mt-10`,
  button: `transition-all border px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  buttonLink: `mt-9 flex justify-center`,
  buttonLinkText: `text-[#212121] hover:text-[#515151] underline transition-all`,
};

const login = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const { redirect } = router.query;

  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (session?.user) {
      router.push(redirect || "/");
    }
  }, [router, session, redirect]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        // toast.error(result.error);
        console.log(result.error);
      }
    } catch (error) {
      //   toast.error(getError(err));
      console.log(getError(err));
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
    <Layout title="Sign in" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.loginContainer}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Sign in" />
        <div className={style.pageContent}>
          <div className={style.formContainer}>
            <form className={style.form} onSubmit={handleSubmit(submitHandler)}>
              <header>
                <h2 className={style.headerText}>Returning Customers</h2>
              </header>
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
                    required: "Please enter your Password",
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
              <RememberMe />
              <div className={style.errorHandler}></div>
              <div className={style.loginButtonContainer}>
                <div className={style.buttonContainer}>
                  <button className={`${style.button} ${style.loginButton}`}>
                    Sign in
                  </button>
                </div>
                <div className={style.buttonLink}>
                  <Link href="/forgotten-password">
                    <span className={style.buttonLinkText}>
                      Forgotten Password
                    </span>
                  </Link>
                </div>
              </div>
            </form>
          </div>

          <div className={style.caContainer}>
            <header>
              <h2 className={style.headerText}>Create an account</h2>
            </header>
            <div className={style.boxContent}>
              <CABenefits />
              <div className={style.caButtonContainer}>
                <div className={style.buttonContainer}>
                  <Link href={`/create-account?redirect=${redirect || "/"}`}>
                    <button className={`${style.button} ${style.createButton}`}>
                      Create Account
                    </button>
                  </Link>
                </div>
                <div className={style.buttonLink}>
                  <Link href="/privacy-policy">
                    <span className={style.buttonLinkText}>Privacy Policy</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {isMobile && <TopContactUs isMobile />}
        </div>
      </div>
    </Layout>
  );
};

export default login;
