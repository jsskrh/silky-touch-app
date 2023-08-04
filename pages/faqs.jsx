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

const content = [
  {
    question: "Is online purchase security assured?",
    answer:
      "Yes, the security of online purchases on the Silky Touch official e-commerce website is guaranteed. We use specific systems, such as the Secure Sockets Layer (SSL), to protect all sensitive information passing through our platform.",
  },
  {
    question: "Can I complete an order without registering?",
    answer:
      "No, registration is required: to complete the order simply register, then enter the shipping and payment information. Registering allows you to take advantage of personalised services and exclusive benefits, such as faster purchases, whishlist management and monitoring future orders. Completed orders from your account will also appear in the my account section after user registration.",
  },
  {
    question: "How can I check the shipping status of my order?",
    answer:
      "Once the order is shipped from our warehouse, you will be sent a confirmation email with all the details of the shipment, including your tracking number. You can check the delivery status directly from the courier's website by inserting the tracking number.",
  },
  {
    question: "How do I return an item?",
    answer:
      "If you are not fully happy with the item(s) you received, you have up to 14 working days from the delivery date to submit a return request. From the customer service page you may fill out the online form. Once you receive return authorisation from Customer Service you may proceed to ship the item(s) back to the warehouse address as indicated in the authorisation email. Upon arrival of the goods in our warehouse, the item(s) will undergo a quality control to verify that the return meets the terms & conditions. Your refund will then be processed on the card used for the purchase within approximately 30 days from the date in which it has been delivered back to our warehouse.",
  },
];

const faqs = () => {
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
    <Layout title="Help / FAQs" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Help / FAQs" />
        <div className={style.pageContent}>
          <div className={style.formContainer}>
            <Accordion type="single" collapsible>
              {content.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export default faqs;
