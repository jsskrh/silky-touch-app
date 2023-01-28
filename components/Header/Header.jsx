import Link from "next/link";
import LinkBag from "./LinkBag";
import LinkProfile from "./LinkProfile";
import LinkWishlist from "./LinkWishlist";
import LinkSearch from "./LinkSearch";
import { useEffect, useRef, useState } from "react";
import data from "../../utils/data";
import NavCatalogue from "./NavCatalogue";

const style = {
  header: `sticky top-0 z-50`,
  navbar: `flex justify-between items-center p-6 bg-white`,
  navGrouping: `flex`,
  brandName: `text-4xl font-bold uppercase mr-12`,
  navLinks: `items-center`,
  navLink: `uppercase pt-0 p-2 font-bold text-xs flex pb-8 text-[#212121] hover:text-[#757575] relative hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:top-5 hover:after:h-[1px] after:left-0 after:right-0`,
  navIcons: `h-4 items-start`,
  navIcon: `flex items-center mx-2 pb-8`,
  heroIcon: `h-4 w-4`,
};

const Header = ({ title }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);

  const catalogueData = data.catalogue.men;
  delete catalogueData.title;
  delete catalogueData.subtitle;
  const catalogueKeys = Object.keys(catalogueData);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={style.header} ref={headerRef}>
      <nav className={style.navbar}>
        <div className={`${style.navGrouping} ${style.navLinks}`}>
          <Link href="/">
            <h1 className={style.brandName}>Luxury</h1>
          </Link>
          <div className="flex h-4 items-start">
            <Link href="/bags">
              <span className={style.navLink}>Bags</span>
            </Link>
            <NavCatalogue category="women" />
            <NavCatalogue category="men" />
            {/* <Link href="/children">
              <span className={style.navLink}>Children</span>
            </Link> */}
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
