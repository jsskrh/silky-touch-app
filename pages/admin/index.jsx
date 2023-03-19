import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../components/Layout/Layout";
import PageTitle from "../../components/PageTitle";
import Logout from "../../components/Profile/Logout";
import ProfileCard from "../../components/Profile/ProfileCard";
import TopContactUs from "../../components/TopContactUs";

const accountCards = [
  {
    header: "Notifications",
    text: "View all notifications",
    link: "/profile/account-details",
  },
  {
    header: "Customers",
    text: "View and manage all existing customers",
    link: "/admin/customers",
  },
  {
    header: "Ongoing Orders",
    text: "Track and view undelivered orders",
    link: "/admin/orders/ongoing",
  },
  {
    header: "All Orders",
    text: "Track and view all order status and history",
    link: "/admin/orders",
  },
  {
    header: "Add Product",
    text: "Add new products to the database",
    link: "/orders",
  },
  {
    header: "Settings",
    text: "Edit system settings and preferences",
    link: "/profile/wishlist",
  },
];

const style = {
  profilePage: `pb-4 mx-5`,
  gridContainer: `mb-4`,
  accountGrid: `grid grid-cols-1 gap-[2px] md:grid-cols-3 max-w-4xl mx-auto mb-6`,
};

const admin = () => {
  const [isMobile, setIsMobile] = useState();
  const { status, data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      return;
    }

    if (!session?.user) {
      router.push("/login");
    }

    if (!session?.user.isAdmin) {
      router.push("/401");
    }
  }, [status, session]);

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

  if (status === "loading") {
    return <div>Loading</div>;
  }

  if (!session?.user) {
    return null; // or render a message asking the user to log in
  }

  if (!session?.user.isAdmin) {
    return null;
  }

  return (
    <Layout title="Admin" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Admin Panel" />
        <Logout />
        <div className={style.gridContainer}>
          <div className={style.accountGrid}>
            {accountCards.map((card, index) => (
              <ProfileCard card={card} key={index} />
            ))}
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export default admin;
