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
    question: "When will my order be delivered?",
    answer:
      "Orders placed during workdays (Monday to Friday) are usually processed in the same day and the delivery is carried out in timeframes depending on the destination country. Since there are no shipments on Saturdays, Sundays or holidays they will be shipped on the following work day.",
  },
  {
    question: "Does the order date differ from the shipping date?",
    answer:
      "The order date refers to the date on which you receive the order confirmation email, whereas the shipping date refers to the date on which the goods were dispatched from our warehouse and handed over to the carrier.",
  },
  {
    question: "How can I track the delivery status?",
    answer:
      "As soon as the order is dispatched from our warehouse, you will be sent a shipping confirmation email which will include the courier's tracking number. You may use this number on the courier's website to track delivery of your package.",
  },
  {
    question:
      "What happens if the carrier does not find anyone at home at the indicated delivery address?",
    answer:
      "After one or more failed delivery attempts, your goods will be placed in stock at the carrier's warehouse. You will be contacted by our Customer Service and requested to provide any information necessary to proceed with the delivery. If you have not replied within three days after the notification, your items will return to our own warehouse and the amount of your order will be refunded within 30 days of the return date.",
  },
  {
    question: "Will the carrier contact me before the delivery?",
    answer:
      "Though it may occur, carriers are not obligated to contact you before delivery nor to precise a specific delivery time.",
  },
];

const orderShipping = () => {
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
    <Layout title="Order & Shipping" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Order & Shipping" />
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

export default orderShipping;
