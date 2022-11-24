import Link from "next/link";
import { useContext } from "react";
import { Store } from "../../utils/Store";

const style = {
  shippingSummary: `mb-[22px] px-[22px] py-[27px] bg-[#f5f5f5] text-[0.80rem]`,
  ssHeader: `mb-[30px] flex justify-between items-center`,
  ssTitle: `uppercase font-bold`,
  ssLink: `underline font-base`,
  detail: `mb-1`,
  deliveryTime: `pt-3 font-bold`,
  button: `transition-all border px-[10px] py-[10px] text-xs font-bold uppercase bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const ShippingSummary = ({
  orderShippingAddress,
  isDelivered,
  deliveredAt,
  convertDate,
}) => {
  const { state } = useContext(Store);
  let {
    cart: { shippingAddress },
  } = state;

  if (orderShippingAddress) {
    shippingAddress = orderShippingAddress;
  }

  return (
    <div className={style.shippingSummary}>
      <header className={style.ssHeader}>
        <span className={style.ssTitle}>Shipping Summary</span>
        {!orderShippingAddress ? (
          <span className={style.ssLink}>
            <Link href="/shipping">Edit</Link>
          </span>
        ) : isDelivered ? (
          <span className={style.button}>Delivered</span>
        ) : (
          <span className={style.button}>Undelivered</span>
        )}
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
        {isDelivered && (
          <p className={`${style.detail} ${style.deliveryTime}`}>
            Delivered at {convertDate(deliveredAt)}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShippingSummary;
