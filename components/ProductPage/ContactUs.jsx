import Link from "next/link";

const style = {
  contactUsContainer: `py-7 flex justify-center font-bold text-sm`,
  contactUs: `hover:text-[#757575] hover:underline`,
};

const ContactUs = () => {
  return (
    <div className={style.contactUsContainer}>
      {/* <Link href="/contact-us"> */}
      <span className={style.contactUs}>Contact Us</span>
      {/* </Link> */}
    </div>
  );
};

export default ContactUs;
