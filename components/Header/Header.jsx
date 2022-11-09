import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Store } from "../../utils/Store";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const style = {
  header: `sticky top-0 bg-[#fff] z-50`,
  navbar: `flex justify-between items-center p-6`,
  navGrouping: `flex items-center`,
  brandName: `text-4xl font-bold uppercase mr-12`,
  navLink: `uppercase p-2 font-bold text-xs`,
  navIcon: `flex items-center mx-2`,
  heroIcon: `h-4 w-4`,
  cartAmount: `text-xs align-bottom self-end text-end`,
};

const Header = () => {
  const { status, data: session } = useSession();

  const { state } = useContext(Store);
  const { cart } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, b) => a + b.quantity, 0));
  }, [cart.cartItems]);

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
          <Link href="login?redirect=/profile">
            <span className={style.navIcon}>
              {status === "loading" ? (
                "Loading"
              ) : session?.user ? (
                session.user.name
              ) : (
                <UserIcon className={style.heroIcon}></UserIcon>
              )}
            </span>
          </Link>
          <Link href="/bag">
            <span className={style.navIcon}>
              <ShoppingBagIcon className={style.heroIcon}></ShoppingBagIcon>{" "}
              {cartItemsCount > 0 && (
                <span className={style.cartAmount}>{cartItemsCount}</span>
              )}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
