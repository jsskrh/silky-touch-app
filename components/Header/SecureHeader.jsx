import Link from "next/link";
import { LockClosedIcon } from "@heroicons/react/24/solid";

const style = {
  header: `sticky top-0 z-50 border-b border-[#e6e6e6] bg-[#fdfdfd]`,
  navbar: `items-center py-9 container mx-auto grid md:grid-cols-3 text-[0.86rem]`,
  navStart: `flex justify-start items-center`,
  heroIcon: `h-6 w-6 mr-2`,
  secureText: `uppercase`,
  navCenter: `flex justify-center`,
  brandName: `text-4xl font-bold uppercase`,
  navIcons: `h-4 items-start`,
  navIcon: `flex items-center mx-2 pb-8`,
  helpText: `text-end`,
  linkText: `underline`,
};

const SecureHeader = () => {
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.navStart}>
          <span className={style.heroIcon}>
            <LockClosedIcon />
          </span>
          <strong className={style.secureText}>Secure Checkout</strong>
        </div>
        <div className={style.navCenter}>
          <Link href="/">
            <h1 className={style.brandName}>Luxury</h1>
          </Link>
        </div>
        <div className={style.navEnd}>
          <p className={style.helpText}>
            <strong>Need Assistance?</strong>
          </p>
          <p className={style.helpText}>
            Please contact our Customer Care team on{" "}
            <Link href="/customer-care" className={style.linkText}>
              08000000000
            </Link>
          </p>
        </div>
      </nav>
    </header>
  );
};

export default SecureHeader;
