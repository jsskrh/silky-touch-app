import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Layout from "../../../../components/Layout/Layout";
import PageTitle from "../../../../components/PageTitle";
import Logout from "../../../../components/Profile/Logout";
import AddSubategory from "../../../../components/Settings/AddSubategory";
import CategoryCard from "../../../../components/Settings/CategoryCard";
import db from "../../../../utils/db";
import Category from "../../../../models/category";
import TopContactUs from "../../../../components/TopContactUs";

const style = {
  profilePage: `pb-4 mx-5`,
  gridContainer: `mb-4`,
  accountGrid: `grid grid-cols-1 gap-3 md:grid-cols-2 max-w-5xl mx-auto mb-6`,
};

const categoryPage = ({ subcategory }) => {
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
    <Layout
      title={`${subcategory.name} Category Settings`}
      bgColor={`bg-[#f5f5f5]`}
    >
      <div className={style.profilePage}>
        {!isMobile && <TopContactUs />}
        <PageTitle title={`${subcategory.name} Category Settings`} />
        <Logout />
        <div className={style.gridContainer}>
          <div className={style.accountGrid}>
            <AddSubategory parentId={subcategory._id} />
            {subcategory.subcategories.map((category) => (
              <CategoryCard category={category} key={category.slug} />
            ))}
          </div>
        </div>
        {isMobile && <TopContactUs isMobile />}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;
  console.log(category);

  await db.connect();
  const subcategory = await Category.findOne({ slug: category })
    .populate({ path: "subcategories" })
    .lean();

  if (subcategory.subcategories !== []) {
    subcategory.subcategories.map(db.convertDocsToObj);
  }
  db.disconnect();
  return {
    props: { subcategory: db.convertDocsToObj(subcategory) },
  };
}

export default categoryPage;
