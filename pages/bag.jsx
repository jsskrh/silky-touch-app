import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import BagContactUs from "../components/Bag/BagContactUs";
import BagTable from "../components/Bag/BagTable";
import OrderSummary from "../components/Bag/OrderSummary";
import TopContactUs from "../components/TopContactUs";
import Layout from "../components/Layout/Layout";
import { Store } from "../utils/Store";
import PageTitle from "../components/PageTitle";
import MiniBagTable from "../components/Header/MiniBagTable";
import MiniBagItem from "../components/Header/MiniBagItem";
import Empty from "../components/Bag/Empty";

const style = {
  bagContainer: `mt-10`,
  cartHeader: `flex justify-center text-sm mb-12`,
  bagHead: `mx-2`,
  wlHead: `underline hover:text-[#757575]`,
  pageContent: `md:flex`,
  cartItemsSection: `flex-1 mx-5 md:mx-0`,
  rightSection: `md:ml-10 md:w-[375px]`,
  table: `border-t border-[#dbdcdc]`,
  tableHead: `hidden`,
};

const bag = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [isMobile, setIsMobile] = useState();

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
    <Layout title="Your shopping bag" bgColor={`bg-[#f5f5f5]`}>
      <div className={style.bagContainer}>
        <div>
          {!isMobile && <TopContactUs />}

          <PageTitle title="Shopping Bag" />

          <div className={style.cartHeader}>
            <h2 className={style.bagHead}>
              <span>Shopping Bag</span> (<span>{cartItems.length}</span>)
            </h2>
            <h2 className={style.bagHead}>
              <button className={style.wlHead}>Wishlist</button> (<span>0</span>
              )
            </h2>
          </div>
        </div>

        <div className={style.pageContent}>
          <div className={style.cartItemsSection}>
            {cartItems.length === 0 ? (
              <Empty title="Bag Empty." text="You have 0 items in your bag" />
            ) : isMobile ? (
              <table className={style.table}>
                <thead className={style.tableHead}>
                  <tr>
                    <th>Image</th>
                    <th>Details</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <MiniBagItem item={item} key={index} parent="header" />
                  ))}
                </tbody>
              </table>
            ) : (
              <BagTable cartItems={cartItems} />
            )}
          </div>

          <div className={style.rightSection}>
            {cartItems.length > 0 && <OrderSummary cartItems={cartItems} />}
            <BagContactUs />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(bag), { ssr: false });
