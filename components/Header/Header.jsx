import Link from "next/link";
import LinkBag from "./LinkBag";
import LinkProfile from "./LinkProfile";
import LinkWishlist from "./LinkWishlist";
import LinkSearch from "./LinkSearch";

const style = {
  header: `sticky top-0 z-50`,
  navbar: `flex justify-between items-center p-6 bg-white`,
  navGrouping: `flex`,
  brandName: `text-4xl font-bold uppercase mr-12`,
  navLinks: `items-center`,
  navLink: `uppercase p-2 font-bold text-xs text-[#212121] hover:text-[#757575] relative hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:bottom-1 hover:after:h-[1px] after:left-0 after:right-0`,
  navIcons: `h-4 items-start`,
  navIcon: `flex items-center mx-2 pb-8`,
  heroIcon: `h-4 w-4`,
};

const Header = ({ title }) => {
  return (
    <header className={style.header}>
      <nav className={style.navbar}>
        <div className={`${style.navGrouping} ${style.navLinks}`}>
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
        <div className={`${style.navGrouping} ${style.navIcons}`}>
          <LinkSearch />
          <LinkWishlist />
          <LinkProfile />
          <LinkBag title={title} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
