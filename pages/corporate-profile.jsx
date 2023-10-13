import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";
import ProfileCard from "../components/Profile/ProfileCard";
import Logout from "../components/Profile/Logout";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const corporateProfile = () => {
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
    <Layout title="Corporate Profile" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Corporate Profile" />
        <div className={style.pageContent}>
          <div className={`max-sm:mx-5`}>
            <p className="mb-5">
              Welcome to Silky Touch Emporium, Fine Clothier and Fashion
              Consultants since 1984. Distinctly Exclusive with a Penchant for
              Classy Fashion Enthusiasts!
            </p>
            <p className="mb-5">An Expanding Vision.</p>
            <p className="mb-5">
              Our goal is to ensure that we satisfy our customers, providing
              them with every service and exclusive fashion product that will
              encourage them to continue to express their individual style.
            </p>
            <p className="mb-5">
              Therefore, we will by the grace of God strive to position a Silky
              Touch Emporium at strategic locations across the country for more
              easy accessibility to our exclusive product of style.
            </p>
            <p className="mb-5">
              The Abuja Emporium which is part of our master plan and designed
              to meet the Sartorial needs of the nation’s policy and Lawmakers
              is presently under construction, to become operational in a couple
              of years. In the meantime a sales office has been put in place to
              conduct the business of delivery and receiving orders.
            </p>
            <p className="mb-5">
              Our tailoring department which was created specifically for
              alterations and repair is undergoing extension. Arrangements have
              been concluded for a member of the unit to be trained by the
              Brioni Master tailors at the factory at penne so that accurate
              measurements “the Brioni way” can be achieved for our customers
              who require made-to-measure garments.
            </p>
            <p className="mb-2">
              Finally we have made tremendous progress in our efforts to see
              that in Nigeria our customers can have the benefit of first rate
              garment maintenance and cleaning service that can compete with the
              best quality fashion products, we are also concerned about their
              proper maintenance, since every Silky Touch Product sold to our
              esteemed customer is an investment.
            </p>
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export default corporateProfile;
