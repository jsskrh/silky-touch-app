import { XCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { forwardRef, useContext } from "react";
import { formatCurrency } from "../../utils/currency";
import { Store } from "../../utils/Store";

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

const MiniBagItem = forwardRef(({ item, parent, orderItems }, ref) => {
  const { dispatch } = useContext(Store);

  const removeItemHandler = () => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <tr
      className={`${style.tableRow} ${
        parent === "header" ? style.textSm : style.textXs
      } ${orderItems?.length === 1 && "border-b-0"}`}
    >
      <td className={style.imageCell}>
        <Link
          href={`/${item.category}/${item.subcategory}/${item.subSubcategory}/${item._id}`}
        >
          <img
            src={item.images.find((image) => image.type === "primary").url}
            alt={item.name}
          />
        </Link>
      </td>
      <td className={style.detailsContainer}>
        <div className={style.productDetails}>
          <div className={`${parent === "header" && style.name}`}>
            <Link
              href={`/${item.category}/${item.subcategory}/${item.subSubcategory}/${item._id}`}
            >
              {item.name}
            </Link>
          </div>
          {!orderItems && (
            <div className={style.attribute}>
              <span>Colour:</span>{" "}
              <span>
                {item.color.map((colour) => (
                  <span key={colour}>{colour} </span>
                ))}
              </span>
            </div>
          )}
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
            {/* <span>{formatCurrency(item.price * item.quantity)}</span> */}
          </div>
        </div>
      </td>
    </tr>
  );
});

export default MiniBagItem;
