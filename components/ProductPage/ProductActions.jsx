import { useContext } from "react";
import { Store } from "../../utils/Store";

const style = {
  productActions: `mb-8`,
  addToCartContainer: `mb-8`,
  addToCart: `bg-[#212121] text-[#fafafa] border border-[#212121] px-4 py-[20px] w-full text-sm font-bold uppercase`,
  otherActions: `flex justify-center`,
  action: `m-4`,
};

const ProductActions = ({ product }) => {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = () => {
    const exists = state.cart.cartItems.find(
      (cartItem) => cartItem.slug === product.slug
    );
    const quantity = exists ? exists.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  return (
    <div className={style.productActions}>
      <div className={style.addToCartContainer}>
        {product.countInStock >= 1 ? (
          <button className={style.addToCart} onClick={addToCartHandler}>
            Add To Bag
          </button>
        ) : (
          <button className={style.addToCart} disabled>
            Out of Stock
          </button>
        )}
      </div>
      <div className={style.otherActions}>
        <div className={style.action}>O</div>
        <div className={style.action}>O</div>
      </div>
    </div>
  );
};

export default ProductActions;
