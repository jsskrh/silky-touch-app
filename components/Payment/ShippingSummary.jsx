import Link from "next/link";
import { useContext } from "react";
import { Store } from "../../utils/Store";

const style = {
  shippingSummary: `mt-[22px] px-[22px] py-[27px] bg-[#f5f5f5] text-[0.80rem]`,
  ssHeader: `mb-[30px] flex justify-between`,
  ssTitle: `uppercase font-bold`,
  ssLink: `underline font-base`,
  details: ``,
  detail: `mb-1`,
};

const ShippingSummary = () => {
  const { state } = useContext(Store);
  const {
    cart: { shippingAddress },
  } = state;

  return (
    <div className={style.shippingSummary}>
      <header className={style.ssHeader}>
        <span className={style.ssTitle}>Shipping Summary</span>
        <span className={style.ssLink}>
          <Link href="/shipping">Edit</Link>
        </span>
      </header>
      <div className={style.details}>
        <p className={style.detail}>
          <span>{shippingAddress.prefix}</span>{" "}
          <span>{shippingAddress.firstName}</span>{" "}
          <span>{shippingAddress.lastName}</span>
        </p>
        <p className={style.detail}>
          <span>{shippingAddress.address}</span>{" "}
          <span>{shippingAddress.postalCode}</span>
        </p>
        <p className={style.detail}>{shippingAddress.country}</p>
        <p className={style.detail}>Phone: {shippingAddress.phoneNumber}</p>
        <p className={style.detailsItem}>Shipping Type: Lorem Ipsom</p>
      </div>
    </div>
  );
};

export default ShippingSummary;
