import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import TableRow from "../components/Bag/TableRow";
import Layout from "../components/Layout/Layout";
import { Store } from "../utils/Store";

const style = {
  bagContainer: `pt-5 bg-[#f5f5f5]`,
  helpContainer: `pb-7 text-sm`,
  helpWrapper: `flex flex-col items-end`,
  helpTitle: `mb-1`,
  bagTitle: `flex justify-center mb-11 uppercase font-bold text-xl`,
  cartHeader: `flex justify-center text-sm mb-12`,
  bagHead: `mx-2`,
  wlHead: `underline hover:text-[#757575]`,
  pageContent: `md:flex`,
  cartItemsSection: `flex-1`,
  ebContainer: `mb-4 flex flex-col items-center`,
  ebTitle: `mb-2 font-bold text-lg`,
  ebText: `mb-2 text-sm`,
  cShoppingContainer: `mr-4`,
  cShopping: `hover:bg-[#212121] hover:text-[#fafafa] border border-[#212121] px-[30px] py-[13px] text-xs font-bold uppercase`,
  table: `p-1 border-t border-[#dcdcdc] w-full`,
  tableHead: `hidden`,
  paymentSection: `ml-10 w-[375px]`,
  paymentBox: `bg-[#fff] py-[38px] px-[22px] mb-4 text-sm`,
  paymentTitle: `pb-[38px] mb-[20px] border-b border-[#d7d7d7] uppercase text-lg font-bold`,
  costModContainer: `flex justify-between pb-5 mb-5 border-b border-[#d7d7d7]`,
  totalContainer: `pb-[20px] font-bold flex justify-between`,
  sCheckoutContainer: `mt-5 mb-8`,
  sCheckout: `bg-[#212121] text-[#fafafa] border border-[#212121] px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
  paymentAssistance: `text-sm px-6 py-5 mb-4`,
  paHead: `font-bold mb-2`,
  paText: `mb-2`,
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
          <div className={style.helpContainer}>
            <p className={style.helpWrapper}>
              <strong className={style.helpTitle}>Need Assistance?</strong>
              <span>
                Please contact our Customer Care team on{" "}
                <span>+23480xxxxxxxx</span>
              </span>
            </p>
          </div>

          <h1 className={style.bagTitle}>Shopping Bag</h1>

          <div className={style.cartHeader}>
            <h2 className={style.bagHead}>
              <span>Shopping Bag</span> (<span>{cartItems.length}</span>)
            </h2>
            <h2 className={style.bagHead}>
              <span className={style.wlHead}>Wishlist</span> (<span>0</span>)
            </h2>
          </div>
        </div>

        <div className={style.pageContent}>
          <div className={style.cartItemsSection}>
            {cartItems.length === 0 ? (
              <div className={style.ebContainer}>
                <h2 className={style.ebTitle}>Bag Empty.</h2>
                <p className={style.ebText}>You have 0 items in your bag</p>
                <Link href="/">
                  <div className={style.cShoppingContainer}>
                    <button className={style.cShopping}>
                      Continue Shopping
                    </button>
                  </div>
                </Link>
              </div>
            ) : (
              <div>
                <table className={style.table}>
                  <thead className={style.tableHead}>
                    <tr>
                      <th>Image</th>
                      <th>Details</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <TableRow item={item} key={item.sku} />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className={style.paymentSection}>
            {cartItems.length > 0 && (
              <div className={style.paymentBox}>
                <h2 className={style.paymentTitle}>Order Summary</h2>
                <div className={style.costDetails}>
                  <div className={style.costModContainer}>
                    <span>Subtotal</span>
                    <span>
                      ${cartItems.reduce((a, b) => a + b.quantity * b.price, 0)}
                    </span>
                  </div>
                  <div className={style.totalContainer}>
                    <span>Estimated Total</span>
                    <span>
                      ${cartItems.reduce((a, b) => a + b.quantity * b.price, 0)}
                    </span>
                  </div>
                </div>
                <div className={style.sCheckoutContainer}>
                  <button
                    className={style.sCheckout}
                    onClick={() => router.push("/shipping")}
                  >
                    Secure Checkout
                  </button>
                </div>
              </div>
            )}

            <div className={style.paymentAssistance}>
              <h3 className={style.paHead}>Need Assistance?</h3>
              <p className={style.paText}>
                Please contact our Customer Care team either
              </p>
              <p className={style.paText}>
                By telephone: <span>+23480xxxxxxxx</span> Or via our{" "}
                <Link href="/contact-us">Contact Form</Link>
              </p>
              <p className={style.paText}>
                Our Customer Care team is available to help you from Monday to
                Saturday from 8 AM to 10 PM (GMT+1).
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default bag;
