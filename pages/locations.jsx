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

const locations = () => {
  const [isMobile, setIsMobile] = useState();
  const router = useRouter();

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
    <Layout title="Find a Boutique" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Find a Boutique" />
        <div className={style.pageContent}>
          <div className={`max-sm:mx-2`}>
            {/* <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7363080308646!2d3.4258586999999996!3d6.4279137!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf531e5f89721%3A0xc7b44871cbc9e2ea!2sSilky%20Touch%20Emporium%20Limited!5e0!3m2!1sen!2sng!4v1691102394565!5m2!1sen!2sng"
              // width="600"
              height="450"
              className="w-full"
              // style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe> */}
            <iframe
              src="https://www.google.com/maps/d/embed?mid=1fI-wpoxY-JdJgKQXVEujrbAXWVqaukw&ehbc=2E312F"
              // width="640"
              // height="480"
              height="450"
              className="w-full"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export default locations;
