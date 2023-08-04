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
    question: "Can I cancel an order and get refunded?",
    answer:
      "If your order has already been shipped or if the status of your order is marked as “confirmed”, the order cannot be deleted and shipment will be carried out in full. We invite you to wait until your package arrives at your requested delivery address and then contact our Customer Service to request a formal return and subsequent refund.",
  },
  {
    question: "How can I return an Item?",
    answer:
      "If you are not fully satisfied with the item(s) you received, you have up to 14 days from the delivery date to submit a return request. From the CUSTOMER SERVICE page you may fill out the online form. Once you receive return authorisation from Customer Service you may proceed to ship the item(s) back to the warehouse address as indicated in the authorisation email at your own expense.",
  },
  {
    question:
      "I have received a different item than the one ordered or a defective product, what should I do?",
    answer:
      "Should the product received not be the same as the one ordered or have any defects, Silky Touch will take full responsibility for the return. You should contact our Customer Service which will issue authorisation for the Return Service and make arrangements with the carrier to pick up the package at no extra cost to you. A new delivery bill will be issued and sent to you by email which must be printed and attached to the package.",
  },
  {
    question: "When will you send me the refund?",
    answer:
      "Upon arrival of the goods in our warehouse, the item(s) will undergo a quality control to verify that the return meets the Silky Touch TERMS & CONDITIONS. No refunds are possible for products received in conditions not complying with these terms. Should the return be accepted, your refund will then be processed on the card used for the purchase within approximately 30 days from the date in which it has been delivered back to our warehouse and you will receive a confirmation email.",
  },
  {
    question: "What can I do if the amount refunded to me is not correct?",
    answer:
      "Contact our Customer Service to notify us of any discrepancy in the refund amount. Customer Service assesses claims on a case by case basis and will define the eventual amount to be refunded.",
  },
  {
    question:
      "What happens if a returned item does not pass the warehouse control for compliance with the Silky Touch TERMS & CONDITIONS?",
    answer:
      "In case a return does not comply with the Silky Touch TERMS & CONDITIONS, your item(s) will be shipped back to you and no refund will be issued.",
  },
  {
    question: "How can I check the delivery status of the return?",
    answer:
      "If the return has been picked-up by SR Customer Service's courier, you may track its delivery to our warehouse by using the tracking number supplied in your return confirmation email through the carrier's website.",
  },
];

const returnRefunds = () => {
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
    <Layout title="Return & Refunds" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Return & Refunds" />
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

export default returnRefunds;
