import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { Store } from "../../utils/Store";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShareIcon } from "@heroicons/react/24/outline";

const style = {
  productActions: `mb-8`,
  addToCartContainer: `mb-8`,
  addToCart: `bg-[#212121] text-[#fafafa] border border-[#212121] px-4 py-[20px] w-full text-sm font-bold uppercase`,
  otherActions: `flex justify-center`,
  action: `m-3`,
  heroIcon: `h-7 w-7`,
  mobileButtonContainer: `fixed bottom-0 left-0 right-0 flex md:hidden`,
};

const ProductActions = ({ product }) => {
  const { state, dispatch } = useContext(Store);

  const addToCartHandler = async () => {
    const exists = state.cart.cartItems.find(
      (cartItem) => cartItem._id === product._id
    );
    const quantity = exists ? exists.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return;
    }

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
  };

  const [isVisible, setIsVisible] = useState(true);

  const buttonRef = useRef();

  useEffect(() => {
    const targetDiv = buttonRef.current;
    const handleScroll = () => {
      const targetDivRect = targetDiv.getBoundingClientRect();
      if (targetDivRect.top > window.innerHeight && targetDivRect.bottom >= 0) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={style.productActions}>
      <div className={style.addToCartContainer} ref={buttonRef}>
        {product.countInStock >= 1 ? (
          <div className="flex flex-col gap-y-3">
            <a href="https://wa.me/2349166426170" target="_blank">
              <button className={style.addToCart} onClick={addToCartHandler}>
                Request a Price
              </button>
            </a>
            <button className={style.addToCart} onClick={addToCartHandler}>
              Add To Bag
            </button>
          </div>
        ) : (
          <button className={style.addToCart} disabled>
            Out of Stock
          </button>
        )}
      </div>
      <div className={style.otherActions}>
        <button className={style.action}>
          <HeartIcon className={style.heroIcon}></HeartIcon>
        </button>
        <button className={style.action}>
          <ShareIcon className={style.heroIcon}></ShareIcon>
        </button>
      </div>

      {isVisible && (
        <div className={style.mobileButtonContainer}>
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
      )}
    </div>
  );
};

export default ProductActions;
