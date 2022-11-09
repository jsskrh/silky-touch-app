import Link from "next/link";
import { useSession } from "next-auth/react";
import Layout from "../components/Layout/Layout";
import PageTitle from "../components/PageTitle";
import TopContactUs from "../components/TopContactUs";

const style = {
  profilePage: `bg-[#f5f5f5] pb-4`,
  wbContainer: `flex justify-center mb-16 text-sm`,
  wbDivider: `px-2`,
  link: `text-[#212121] hover:text-[#515151] underline`,
  gridContainer: `mb-4`,
  accountGrid: `grid grid-cols-1 gap-[2px] md:grid-cols-3 max-w-4xl mx-auto mb-6`,
  card: `text-sm`,
  cardInner: `py-12 px-[19%] text-center bg-[#fff]`,
  cHeader: `mb-7 uppercase hover:text-[#515151] inline-block`,
  cText: `mb-9`,
  cLink: `px-[50px] py-[14px] border border-[#212121] uppercase text-xs font-bold hover:bg-[#212121] hover:text-[#fff]`,
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

  return (
    <Layout title="My Account">
      <div className={style.profilePage}>
        <TopContactUs />
        <PageTitle title="My Account" />
        <div className={style.wbContainer}>
          <span>Welcome, {session?.user.name}</span>
          <span className={style.wbDivider}>|</span>
          <span className={style.link}>
            <Link href="/logout">Log out</Link>
          </span>
        </div>
        <div className={style.gridContainer}>
          <div className={style.accountGrid}>
            {accountCards.map((card, index) => (
              <div className={style.card} key={index}>
                <div className={style.cardInner}>
                  <h3 className={style.cHeader}>
                    <Link href={card.link}>{card.header}</Link>
                  </h3>
                  <div className={style.cText}>{card.text}</div>
                  <div className={style.cLinkContainer}>
                    <Link href={card.link}>
                      <button className={style.cLink}>View</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default profile;
