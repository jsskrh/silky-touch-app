import Link from "next/link";

const style = {
  footer: `flex flex-col text-xs`,
  topInner: `pt-24 hidden lg:block`,
  mobileInner: `pt-16 flex lg:hidden justify-center flex-wrap mx-5`,
  listItem: `flex h-6`,
  mobileText: `whitespace-nowrap`,
  separator: `mx-4`,
  helpText: `mb-2 pb-4 text-center`,
  copyrightText: `border-t border-[#e6e6e6] mt-16 lg:mt-24 py-7 text-center`,
  linkText: `underline`,
};

const SecureFooter = () => {
  return (
    <footer className={style.footer}>
      <div className={style.top}>
        <div className={style.topInner}>
          <p className={style.helpText}>
            <strong>Need help completing your order?</strong> Please contact our
            Customer Care team on{" "}
            <Link href="/customer-care" className={style.linkText}>
              01-2700195
            </Link>{" "}
            or{" "}
            <Link href="/customer-care" className={style.linkText}>
              +2349166426170
            </Link>
          </p>
        </div>

        <ul className={style.mobileInner}>
          <li className={style.listItem}>
            <span className={style.mobileText}>Contact Us</span>
            <span className={style.separator}>|</span>
          </li>
          <li className={style.listItem}>
            <span className={style.mobileText}>Help</span>
            <span className={style.separator}>|</span>
          </li>
          <li className={style.listItem}>
            <span className={style.mobileText}>Terms and Conditions</span>
            <span className={style.separator}>|</span>
          </li>
          <li className={style.listItem}>
            <span className={style.mobileText}>Privacy Policy</span>
          </li>
        </ul>
      </div>

      <div className={style.copyrightWrapper}>
        <p className={style.copyrightText}>© Silky Touch Emporium 2023</p>
      </div>
    </footer>
  );
};

export default SecureFooter;
