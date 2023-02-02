import Link from "next/link";

const style = {
  contactUs: `text-sm md:px-6 mt-16 md:mt-0 md:py-5 mb-4 mx-5 md:mx-0`,
  head: `font-bold mb-2`,
  text: `mb-2`,
};

const BagContactUs = () => {
  return (
    <div className={style.contactUs}>
      <h3 className={style.head}>Need Assistance?</h3>
      <p className={style.text}>Please contact our Customer Care team either</p>
      <p className={style.text}>
        By telephone: <span>+23480xxxxxxxx</span> Or via our{" "}
        <Link href="/contact-us">Contact Form</Link>
      </p>
      <p className={style.text}>
        Our Customer Care team is available to help you from Monday to Saturday
        from 8 AM to 10 PM (GMT+1).
      </p>
    </div>
  );
};

export default BagContactUs;
