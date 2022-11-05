import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext } from "react";
import BagContactUs from "../components/Bag/BagContactUs";
import BagEmpty from "../components/Bag/BagEmpty";
import BagTable from "../components/Bag/BagTable";
import OrderSummary from "../components/Bag/OrderSummary";
import TopContactUs from "../components/Bag/TopContactUs";
import Layout from "../components/Layout/Layout";
import { Store } from "../utils/Store";

const style = {
  bagTitle: `flex justify-center mb-11 uppercase font-bold text-xl`,
  cartHeader: `flex justify-center text-sm mb-12`,
  bagHead: `mx-2`,
  wlHead: `underline hover:text-[#757575]`,
  pageContent: `md:flex`,
  cartItemsSection: `flex-1`,
  rightSection: `ml-10 w-[375px]`,
};

const bag = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <Layout title="Your shopping bag">
      <div className={style.bagContainer}>
        <div>
          <TopContactUs />

          <h1 className={style.bagTitle}>Shopping Bag</h1>

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
              <BagEmpty />
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
