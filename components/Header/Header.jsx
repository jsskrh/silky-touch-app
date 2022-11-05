import Link from "next/link";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const style = {
  header: `sticky top-0 bg-[#fff]`,
  navbar: `flex justify-between items-center p-6`,
  navGrouping: `flex items-center`,
  brandName: `text-4xl font-bold uppercase mr-12`,
  navLink: `uppercase p-2 font-bold text-xs`,
  navIcon: `flex items-center mx-2`,
  heroIcon: `h-4 w-4`,
  cartAmount: `text-xs align-bottom self-end text-end`,
};

const Header = () => {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={style.navGrouping}>
          <Link href="/">
            <h1 className={style.brandName}>Luxury</h1>
          </Link>
          <div>
            <Link href="/bags">
              <span className={style.navLink}>Bags</span>
            </Link>
            <Link href="/women">
              <span className={style.navLink}>Women</span>
            </Link>
            <Link href="/men">
              <span className={style.navLink}>Men</span>
            </Link>
            <Link href="/home-decor">
              <span className={style.navLink}>Home Décor</span>
            </Link>
            <Link href="/children">
              <span className={style.navLink}>Children</span>
            </Link>
            <Link href="/jeans">
              <span className={style.navLink}>Jeans Couture</span>
            </Link>
            <Link href="/stories">
              <span className={style.navLink}>Stories</span>
            </Link>
            <Link href="/gifts">
              <span className={style.navLink}>Gifts</span>
            </Link>
          </div>
        </div>
        <div className={style.navGrouping}>
          <span className={style.navIcon}>
            <MagnifyingGlassIcon
              className={style.heroIcon}
            ></MagnifyingGlassIcon>
          </span>
          <Link href="/wishlist">
            <span className={style.navIcon}>
              <HeartIcon className={style.heroIcon}></HeartIcon>
            </span>
          </Link>
          <Link href="/profile">
            <span className={style.navIcon}>
              <UserIcon className={style.heroIcon}></UserIcon>
            </span>
          </Link>
          <Link href="/bag">
            <span className={style.navIcon}>
              <ShoppingBagIcon className={style.heroIcon}></ShoppingBagIcon>{" "}
              {cart.cartItems.length > 0 && (
                <span className={style.cartAmount}>
                  {cart.cartItems.reduce((a, b) => a + b.quantity, 0)}
                </span>
              )}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;