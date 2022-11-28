import { useRouter } from "next/router";
import { formatCurrency } from "../../utils/currency";

const style = {
  orderSummary: `bg-[#fff] py-[38px] px-[22px] mb-4 text-sm`,
  title: `pb-[38px] mb-[20px] border-b border-[#d7d7d7] uppercase text-lg font-bold`,
  modContainer: `flex justify-between pb-5 mb-5 border-b border-[#d7d7d7]`,
  totalContainer: `pb-[20px] font-bold flex justify-between`,
  checkoutButton: `mt-5 mb-8`,
  checkoutText: `bg-[#212121] text-[#fafafa] border border-[#212121] px-[30px] py-[13px] w-full text-xs font-bold uppercase`,
};

const OrderSummary = ({ cartItems }) => {
  const router = useRouter();

  return (
    <div className={style.orderSummary}>
      <h2 className={style.title}>Order Summary</h2>
      <div className={style.costDetails}>
        <div className={style.modContainer}>
          <span>Subtotal</span>
          <span>
            {formatCurrency(
              cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
            )}
          </span>
        </div>
        <div className={style.totalContainer}>
          <span>Estimated Total</span>
          <span>
            {formatCurrency(
              cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
            )}
          </span>
        </div>
      </div>
      <div className={style.checkoutButton}>
        <button
          className={style.checkoutText}
          onClick={() => router.push("login?redirect=/shipping")}
        >
          Secure Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
