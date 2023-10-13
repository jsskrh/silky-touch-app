import Link from "next/link";
import { useContext } from "react";
import { Store } from "../../utils/Store";

const style = {
  shippingSummary: `mb-[22px] px-[22px] py-[27px] bg-[#f5f5f5] text-[0.80rem]`,
  ssHeader: `mb-[30px] flex justify-between items-center`,
  ssTitle: `uppercase font-bold`,
  ssLink: `underline font-base`,
  detail: `flex justify-between mb-1`,
  paymentTime: `pt-3 font-bold`,
  button: `transition-all border px-[10px] py-[10px] text-xs font-bold uppercase bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const PaymentMethod = ({ orderPaymentMethod, isPaid, paidAt, formatDate }) => {
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
        {!orderPaymentMethod ? (
          <span className={style.ssLink}>
            <Link href="/payment">Edit</Link>
          </span>
        ) : isPaid ? (
          <span className={style.button}>Paid</span>
        ) : (
          <span className={style.button}>Not paid</span>
        )}
      </header>
      <div className={style.details}>
        <p className={style.detail}>
          <span>{paymentMethod}</span>
          <span>Icon</span>
        </p>
        {!isPaid && paymentMethod === "Assisted Payment" && (
          <p className="font-semibold pt-2">
            Customer support representative assisted payment. A customer care
            agent will reach out to take you through the payment procedure.
          </p>
        )}
        {isPaid && (
          <p className={`${style.detail} ${style.paymentTime}`}>
            Paid at {formatDate(paidAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
