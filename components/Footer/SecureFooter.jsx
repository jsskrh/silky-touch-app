import Link from "next/link";

const style = {
  footer: `flex flex-col text-xs`,
  topInner: `pt-24`,
  helpText: `mb-2 pb-4 text-center`,
  copyrightText: `border-t border-[#e6e6e6] mt-24 py-7 text-center`,
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
              08000000000
            </Link>
          </p>
        </div>
      </div>

      <div className={style.copyrightWrapper}>
        <p className={style.copyrightText}>© Jesse Akorah</p>
      </div>
    </footer>
  );
};

export default SecureFooter;
