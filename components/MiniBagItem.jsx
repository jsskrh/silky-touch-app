import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useContext } from "react";
import { Store } from "../utils/Store";

const style = {
  tableRow: `border-b border-[#dbdcdc]`,
  textSm: `text-sm`,
  textXs: `text-xs`,
  imageCell: `pr-[22px] py-[22px] w-[60px] box-content`,
  detailsContainer: `py-[22px]`,
  name: `mb-2 uppercase font-bold`,
  priceContainer: `py-[22px]`,
  priceWrapper: `flex flex-col justify-between items-end h-full`,
  removeButton: `mb-10`,
  heroIcon: `h-5 w-5`,
};

const MiniBagItem = ({ item, parent }) => {
  const { dispatch } = useContext(Store);

  const removeItemHandler = () => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <tr
      className={`${style.tableRow} ${
        parent === "header" ? style.textSm : style.textXs
      }`}
    >
      <td className={style.imageCell}>
        <Link href={`/products/${item.slug}`}>
          <img
            src={item.images.find((image) => "primary" in image).primary}
            alt={item.name}
          />
        </Link>
      </td>
      <td className={style.detailsContainer}>
        <div className={style.productDetails}>
          <div className={`${parent === "header" && style.name}`}>
            <Link href={`/products/${item.slug}`}>{item.name}</Link>
          </div>
          <div className={style.attribute}>
            <span>Colour:</span>{" "}
            <span>
              {item.color.map((colour) => (
                <span key={colour}>{colour} </span>
              ))}
            </span>
          </div>
          <div className={style.attribute}>
            <span>Size:</span> <span>56</span>
          </div>
          <div className={style.attribute}>
            <span>Quantity:</span> <span>{item.quantity}</span>
          </div>
        </div>
      </td>
      <td className={style.priceContainer}>
        <div className={style.priceWrapper}>
          {parent === "header" && (
            <div className={style.removeButton}>
              <button
                className={style.button}
                onClick={() => {
                  removeItemHandler(item);
                }}
              >
                <XCircleIcon className={style.heroIcon}></XCircleIcon>
              </button>
            </div>
          )}
          <div className={style.priceInner}>
            <span>${item.price * item.quantity}</span>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default MiniBagItem;
