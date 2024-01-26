import Link from "next/link";
import { LockClosedIcon, PhoneIcon } from "@heroicons/react/24/solid";

const style = {
  header: `sticky top-0 z-50 border-b border-[#e6e6e6] bg-[#fdfdfd]`,
  navbar: `items-center py-5 lg:py-9 container mx-auto grid grid-cols-3 text-[0.86rem] px-5 lg:px-0`,
  navStart: `flex justify-start items-center`,
  heroIcon: `h-6 w-6 mr-2`,
  secureText: `uppercase hidden md:flex`,
  navCenter: `flex justify-center`,
  brandName: `text-3xl lg:text-4xl font-bold uppercase`,
  logoPlaceholder: `h-9 md:h-10 md:w-[170px] mr-12`,
  logoContainer: `absolute h-16 top-0 bottom-0 my-auto md:h-[85px] flex items-center`,
  brandLogo: `max-h-full max-w-full`,
  navIcons: `h-4 items-start`,
  navIcon: `flex items-center mx-2 pb-8`,
  helpText: `text-end hidden lg:block`,
  linkText: `underline`,
  navEnd: `flex justify-end lg:block`,
  mobileIcon: `h-6 w-6 text-end block lg:hidden`,
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
            {/* <h1 className={style.brandName}>Luxury</h1> */}
            <div className={style.logoPlaceholder}></div>
            <div className={style.logoContainer}>
              <img
                src="/logos/SILKY-TOUCH-LOGO-270.jpg"
                alt="logo"
                className={style.brandLogo}
              />
            </div>
          </Link>
        </div>
        <div className={style.navEnd}>
          <p className={style.helpText}>
            <strong>Need Assistance?</strong>
          </p>
          <p className={style.helpText}>
            Please contact our Customer Care team on{" "}
            <Link href="/customer-care" className={style.linkText}>
              +2348108147951
            </Link>
          </p>
          <PhoneIcon className={style.mobileIcon} />
        </div>
      </nav>
    </header>
  );
};

export default SecureHeader;
