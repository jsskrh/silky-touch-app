import Link from "next/link";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { Store } from "../../utils/Store";
import { formatCurrency } from "../../utils/currency";

const style = {
  tableRow: `border-b border-[#dcdcdc] text-sm`,
  imageCell: `py-6 pr-3 w-[100px] box-content`,
  detailsContainer: `py-6 px-3 align-top`,
  productDetails: `mb-2`,
  name: `mb-4 uppercase`,
  cartEdit: `flex`,
  editButton: `mr-7`,
  button: `flex`,
  heroIcon: `h-5 w-5 ml-1`,
  quantityContainer: `py-6 pl-3`,
  quantityInner: `flex justify-start`,
  priceContainer: `py-6 pl-3`,
  priceInner: `flex justify-end`,
};

const TableRow = ({ item }) => {
  const { dispatch } = useContext(Store);

  const removeItemHandler = () => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };

  return (
    <tr className={style.tableRow}>
      <td className={style.imageCell}>
        <Link
          href={`/${item.category}/${item.subcategory}/${item.subSubcategory}/${item.slug}`}
        >
          <img
            src={item.images.find((image) => image.type === "primary").url}
            alt={item.name}
            className={style.image}
          />
        </Link>
      </td>
      <td className={style.detailsContainer}>
        <div className={style.productDetails}>
          <div className={style.name}>
            <Link
              href={`/${item.category}/${item.subcategory}/${item.subSubcategory}/${item.slug}`}
            >
              {item.name}
            </Link>
          </div>
          <div className={style.attribute}>
            <span>Item:</span> <span>{item.sku}</span>
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
        </div>
        <div className={style.cartEdit}>
          <div className={style.editButton}>
            <span>Edit</span>
          </div>
          <div className={style.editButton}>
            <button
              className={style.button}
              onClick={() => {
                removeItemHandler(item);
              }}
            >
              <span>Remove</span>{" "}
              <XCircleIcon className={style.heroIcon}></XCircleIcon>
            </button>
          </div>
          <div className={style.editButton}>
            <button className={style.button}>
              <span>Move to Wishlist</span>{" "}
              <HeartIcon className={style.heroIcon}></HeartIcon>
            </button>
          </div>
        </div>
      </td>
      <td className={style.quantityContainer}>
        <div className={style.quantityInner}>
          <span>Quantity:</span> <span>{item.quantity}</span>
        </div>
      </td>
      <td className={style.priceContainer}>
        <div className={style.priceInner}>
          <span>{formatCurrency(item.price * item.quantity)}</span>
        </div>
      </td>
    </tr>
  );
};

export default TableRow;
