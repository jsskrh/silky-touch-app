import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";
import Cookies from "js-cookie";
import { useContext } from "react";
import { Store } from "../utils/Store";
import ProfileCard from "../components/Profile/ProfileCard";

const style = {
  profilePage: `bg-[#f5f5f5] pb-4`,
  wbContainer: `flex justify-center mb-16 text-sm`,
  wbDivider: `px-2`,
  link: `text-[#212121] hover:text-[#515151] underline`,
  gridContainer: `mb-4`,
  accountGrid: `grid grid-cols-1 gap-[2px] md:grid-cols-3 max-w-4xl mx-auto mb-6`,
};

const accountCards = [
  {
    header: "Account Details",
    text: "View or change your log-in information",
    link: "/profile/account-details",
  },
  {
    header: "Address Book",
    text: "Add or edit billing or shipping addresses",
    link: "/profile/address-book",
  },
  {
    header: "Payment Cards",
    text: "View and update your saved card details",
    link: "/profile/payment-cards",
  },
  {
    header: "My Orders",
    text: "Track and view order status and history",
    link: "/profile/orders",
  },
  {
    header: "Wish List",
    text: "Search, view and amend your wish list",
    link: "/profile/wishlist",
  },
];

const profile = () => {
  const { data: session } = useSession();
  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <Layout title="My Account">
      <div className={style.profilePage}>
        <TopContactUs />
        <PageTitle title="My Account" />
        <div className={style.wbContainer}>
          <span>Welcome, {session?.user.name}</span>
          <span className={style.wbDivider}>|</span>
          <button className={style.link} onClick={logoutClickHandler}>
            Log out
          </button>
        </div>
        <div className={style.gridContainer}>
          <div className={style.accountGrid}>
            {accountCards.map((card, index) => (
              <ProfileCard card={card} key={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
