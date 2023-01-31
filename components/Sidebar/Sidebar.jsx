import { XMarkIcon, UserIcon, HeartIcon } from "@heroicons/react/24/outline";
import data from "../../utils/data";
import Link from "next/link";
import { useSession } from "next-auth/react";
import CategoryListItem from "./CategoryListItem";

const style = {
  sidebar: `fixed top-0 left-0 w-[339px] bottom-0 bg-[#ddd] -translate-x-full transition duration-500 z-40 overflow-x-hidden`,
  sidebarInner: `py-2 text-sm`,
  sidebarVisible: `translate-x-0`,
  xIcon: `h-8 w-8 absolute -right-10 top-5`,
  categoryList: `bg-[#f5f5f5]`,
  heroIcon: `h-4 w-4 mr-2`,
  arrowRight: `border-t-2 border-r-2 h-2 w-2 border-[#212121] rotate-45`,
  userListItem: `py-4 px-6 flex items-center text-[#212121] hover:text-[#515151] cursor-pointer`,
  currencyCont: `mx-6 border-t border-[#bdbdbd] text-[#757575] py-6 mt-4 flex justify-between items-center cursor-pointer`,
};

const Sidebar = ({ showSidebar, setShowSidebar, setShowFullOverlay }) => {
  const { status, data: session } = useSession();
  const catalogue = data.catalogue;

  return (
    <div className={`${style.sidebar} ${showSidebar && style.sidebarVisible}`}>
      <div className={style.sidebarInner}>
        {showSidebar && (
          <XMarkIcon
            className={style.xIcon}
            onClick={() => {
              setShowSidebar(false);
              setShowFullOverlay(false);
            }}
          />
        )}
        <ul className={style.categoryList}>
          {Object.keys(catalogue).map((category) => (
            <CategoryListItem
              category={catalogue[category]}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              setShowFullOverlay={setShowFullOverlay}
              link={`/${catalogue[category].metadata.slug}`}
            />
          ))}
        </ul>
        <ul>
          <li>
            <Link href="login?redirect=/profile" className={style.userListItem}>
              <UserIcon className={style.heroIcon} />
              {status === "loading" ? (
                <span>Loading</span>
              ) : session?.user ? (
                <span>Welcome, {session.user.name}</span>
              ) : (
                <span>Sign in</span>
              )}
            </Link>
          </li>
          <li className={style.userListItem}>
            <HeartIcon className={style.heroIcon} />
            <span>Wishlist</span>
          </li>
          <li className={`${style.userListItem} justify-between`}>
            <span>Contact Us</span>
            <span
              className={style.arrowRight}
              onClick={(e) => {
                e.preventDefault();
              }}
            ></span>
          </li>
        </ul>
        <div className={style.currencyCont}>
          <div>
            <span>Nigeria</span>|<span>EN</span> <span>(N)</span>
          </div>
          <span
            className={style.arrowRight}
            onClick={(e) => {
              e.preventDefault();
            }}
          ></span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
