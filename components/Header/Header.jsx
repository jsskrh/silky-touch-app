import Link from "next/link";
import LinkBag from "./LinkBag";
import LinkProfile from "./LinkProfile";
import LinkWishlist from "./LinkWishlist";
import LinkSearch from "./LinkSearch";
import { useEffect, useRef, useState } from "react";
import data from "../../utils/data";
import NavCatalogue from "./NavCatalogue";
import FullOverlay from "./FullOverlay";
import Sidebar from "../Sidebar/Sidebar";

const style = {
  header: `sticky top-0 z-50`,
  navbar: `flex justify-between items-center md:p-6 py-4 px-[22px] bg-white`,
  navGrouping: `flex`,
  iconMenu: `w-5 h-4 mr-5 relative overflow-hidden lg:hidden`,
  bar: `absolute w-full h-0.5 overflow-hidden bg-[#212121]`,
  menuTop: `top-0`,
  menuMiddle: `top-[7px]`,
  menuBottom: `bottom-0`,
  brandName: `text-3xl md:text-4xl font-bold uppercase mr-12`,
  navMenuContainer: `hidden lg:flex h-4 items-start`,
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

  const [isMobile, setIsMobile] = useState();

  const [showSidebar, setShowSidebar] = useState(false);
  const [showFullOverlay, setShowFullOverlay] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header className={style.header} ref={headerRef}>
      <nav className={style.navbar}>
        <div className={`${style.navGrouping} ${style.navLinks}`}>
          <button
            className={style.iconMenu}
            onClick={() => {
              console.log("clicked");
              setShowSidebar(true);
              setShowFullOverlay(true);
            }}
          >
            <div className={`${style.bar} ${style.menuTop}`}></div>
            <div className={`${style.bar} ${style.menuMiddle}`}></div>
            <div className={`${style.bar} ${style.menuBottom}`}></div>
          </button>
          <Link href="/">
            <h1 className={style.brandName}>Luxury</h1>
          </Link>
          <div className={style.navMenuContainer}>
            <Link href="/bags">
              <span className={style.navLink}>Bags</span>
            </Link>
            <NavCatalogue category="women" />
            <NavCatalogue category="men" />
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
          {!isMobile && (
            <>
              <LinkWishlist />
              <LinkProfile />
            </>
          )}
          <LinkBag isMobile={isMobile} />
        </div>
      </nav>
      {isMobile && (
        <>
          <Sidebar
            showSidebar={showSidebar}
            setShowSidebar={setShowSidebar}
            setShowFullOverlay={setShowFullOverlay}
          />
          <FullOverlay
            setShowSidebar={setShowSidebar}
            showFullOverlay={showFullOverlay}
            setShowFullOverlay={setShowFullOverlay}
            contRef={headerRef}
          />
        </>
      )}
    </header>
  );
};

export default Header;
