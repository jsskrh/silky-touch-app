import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../../components/Layout/Layout";
import TopContactUs from "../../../components/TopContactUs";
import PageTitle from "../../../components/PageTitle";
import Logout from "../../../components/Profile/Logout";
import ProfileCard from "../../../components/Profile/ProfileCard";

const settingsCards = [
  {
    header: "Catalogue",
    text: "View and manage product categories",
    link: "/admin/settings/catalogue",
  },
  {
    header: "Homepage",
    text: "Manage homepage carousel and brand grid",
    link: "/admin/customers",
  },
  {
    header: "Others",
    text: "Other site settings",
    link: "/admin/orders/ongoing",
  },
];

const style = {
  profilePage: `pb-4 mx-5`,
  gridContainer: `mb-4`,
  accountGrid: `grid grid-cols-1 gap-[2px] md:grid-cols-3 max-w-4xl mx-auto mb-6`,
};

const settings = () => {
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
    <Layout title="Settings" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title="Settings" />
        <Logout />
        <div className={style.gridContainer}>
          <div className={style.accountGrid}>
            {settingsCards.map((card, index) => (
              <ProfileCard card={card} key={index} />
            ))}
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export default settings;
