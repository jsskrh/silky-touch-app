import Link from "next/link";
import { useContext, useState } from "react";
import { Store } from "../utils/Store";
import MiniBagItem from "./MiniBagItem";

const style = {
  orderSummary: `bg-[#f5f5f5] text-[0.80rem]`,
  checkoutOSHeader: `border-b border-[#cecece] py-6 px-[22px] flex justify-between`,
  osTitle: `uppercase font-bold`,
  osLink: `underline font-base`,
  checkoutMiniCart: `px-[22px]`,
  checkoutMiniCartInner: `max-h-[374px] overflow-auto`,
  table: `w-full`,
  tableHead: `hidden`,
  checkoutOrderTotal: `pt-4 border-t border-[#212121]`,
  modContainer: `pb-4 px-[22px]`,
  modifier: `flex justify-between`,
  taxModifier: `mt-4`,
  totalContainer: `border-t border-[#d7d7d7] px-[22px] py-5 flex justify-between font-bold`,
};

const OrderSummary = ({ payment }) => {
  const { state } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const [estimatedShipping, setEstimatedShipping] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [tax, setTAX] = useState(0);

  return (
    <div className={style.orderSummary}>
      <header className={style.checkoutOSHeader}>
        <span className={style.osTitle}>Order Summary</span>
        <span className={style.osLink}>
          <Link href="/bag">Edit</Link>
        </span>
      </header>
      <div className={style.checkoutMiniCart}>
        <div className={style.checkoutMiniCartInner}>
          <table className={style.table}>
            <thead className={style.tableHead}>
              <tr>
                <th>Image</th>
                <th>Details</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <MiniBagItem key={item.slug} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={style.checkoutOrderTotal}>
        <div className={style.modContainer}>
          <div className={style.modifier}>
            <span>Subtotal</span>
            <span>
              ${cartItems.reduce((a, b) => a + b.quantity * b.price, 0)}
            </span>
          </div>
          {!payment ? (
            <div className={style.modifier}>
              <span>Estimated Shipping</span>
              <span>from ${estimatedShipping}</span>
            </div>
          ) : (
            <>
              <div className={style.modifier}>
                <span>Shipping</span>
                <span>${shipping}</span>
              </div>
              <div className={`${style.modifier} ${style.taxModifier}`}>
                <span>TAX</span>
                <span>${tax}</span>
              </div>
            </>
          )}
        </div>
        {payment ? (
          <div className={style.totalContainer}>
            <span>Total</span>
            <span>
              $
              {cartItems.reduce((a, b) => a + b.quantity * b.price, 0) +
                shipping +
                tax}
            </span>
          </div>
        ) : (
          <div className={style.totalContainer}>
            <span>Estimated Total</span>
            <span>
              $
              {cartItems.reduce((a, b) => a + b.quantity * b.price, 0) +
                estimatedShipping}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
