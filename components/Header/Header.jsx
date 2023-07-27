import Link from "next/link";
import LinkBag from "./LinkBag";
import LinkProfile from "./LinkProfile";
import LinkWishlist from "./LinkWishlist";
import LinkSearch from "./LinkSearch";
import { useEffect, useRef, useState, useReducer } from "react";
import NavCatalogue from "./NavCatalogue";
import FullOverlay from "./FullOverlay";
import Sidebar from "../Sidebar/Sidebar";
import { getError } from "../../utils/error";
import axios from "axios";

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
  logoPlaceholder: `h-9 md:h-10 md:w-[170px] mr-12`,
  logoContainer: `absolute h-16 top-0 bottom-0 md:h-[85px] flex items-center`,
  brandLogo: `max-h-full max-w-full`,
  navMenuContainer: `hidden lg:flex h-4 items-start`,
  // navMenuContainer: `hidden lg:flex h-4 items-start ml-[163px] md:ml-[186px]`,
  navLinks: `items-center`,
  navLink: `uppercase pt-0 p-2 font-bold text-xs flex pb-8 text-[#212121] hover:text-[#757575] relative hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:top-5 hover:after:h-[1px] after:left-0 after:right-0`,
  navIcons: `h-4 items-start`,
  navIcon: `flex items-center mx-2 pb-8`,
  heroIcon: `h-4 w-4`,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true, error: "" };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: "",
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const Header = ({ title }) => {
  const [{ loading, error, categories }, dispatch] = useReducer(reducer, {
    loading: true,
    categories: [],
    error: "",
  });

  useEffect(() => {
    const fetchHeaders = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/settings/catalogue");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchHeaders();
  }, []);

  const [headerHeight, setHeaderHeight] = useState(0);

  const headerRef = useRef(null);

  useEffect(() => {
    setHeaderHeight(headerRef.current.clientHeight);
  }, []);

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
            <div className={style.logoPlaceholder}></div>
            <div className={style.logoContainer}>
              <img
                src="/logos/SILKY-TOUCH-LOGO-270.jpg"
                alt="logo"
                className={style.brandLogo}
              />
            </div>
          </Link>
          <div className={style.navMenuContainer}>
            {categories.map((category, index) => (
              <NavCatalogue category={category} key={index} />
            ))}
            <Link href="/fitting-drycleaning">
              <span className={style.navLink}>Fitting and Drycleaning</span>
            </Link>
          </div>
        </div>
        <div className={`${style.navGrouping} ${style.navIcons}`}>
          <LinkSearch />
          {!isMobile && (
            <>
              {/* <LinkWishlist /> */}
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
            categories={categories}
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
