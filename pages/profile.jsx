import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";
import ProfileCard from "../components/Profile/ProfileCard";
import Logout from "../components/Profile/logout";

const style = {
  profilePage: `pb-4`,
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
    link: "/orders",
  },
  {
    header: "Wish List",
    text: "Search, view and amend your wish list",
    link: "/profile/wishlist",
  },
];

const profile = () => {
  return (
    <Layout title="My Account" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        <TopContactUs />
        <PageTitle title="My Account" />
        <Logout />
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
