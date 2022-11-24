import Link from "next/link";
import { useContext } from "react";
import { Store } from "../../utils/Store";

const style = {
  shippingSummary: `mb-[22px] px-[22px] py-[27px] bg-[#f5f5f5] text-[0.80rem]`,
  ssHeader: `mb-[30px] flex justify-between`,
  ssTitle: `uppercase font-bold`,
  ssLink: `underline font-base`,
  detail: `flex justify-between`,
};

const PaymentMethod = ({ orderPaymentMethod }) => {
  const { state } = useContext(Store);
  let {
    cart: { paymentMethod },
  } = state;

  if (orderPaymentMethod) {
    paymentMethod = orderPaymentMethod;
  }

  return (
    <div className={style.shippingSummary}>
      <header className={style.ssHeader}>
        <span className={style.ssTitle}>Payment Method</span>
        {!orderPaymentMethod && (
          <span className={style.ssLink}>
            <Link href="/payment">Edit</Link>
          </span>
        )}
      </header>
      <div className={style.details}>
        <p className={style.detail}>
          <span>{paymentMethod}</span>
          <span>Icon</span>
        </p>
      </div>
    </div>
  );
};

export default PaymentMethod;
