import { Menu, Transition } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../../utils/Store";
import MenuItems from "./MenuItems";
import NavIcon from "./NavIcon";

const style = {
  cartAmount: `text-xs align-bottom self-end text-end`,
  rightMenu: `relative`,
  menuButton: `align-top`,
  heroIcon: `h-4 w-4`,
  iconAndText: `flex`,
};

const LinkBag = ({ isMobile }) => {
  const { state } = useContext(Store);
  const { cart } = state;
  const {
    cart: { cartItems },
  } = state;
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const [isShowing, setIsShowing] = useState(false);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((a, b) => a + b.quantity, 0));
  }, [cart.cartItems]);

  return (
    <Menu as="div" className={style.rightMenu}>
      <Menu.Button
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
        className={style.menuButton}
      >
        <NavIcon link="/bag">
          <div className={style.iconAndText}>
            <ShoppingBagIcon className={style.heroIcon}></ShoppingBagIcon>{" "}
            {cartItemsCount > 0 && (
              <span className={style.cartAmount}>{cartItemsCount}</span>
            )}
          </div>
        </NavIcon>
      </Menu.Button>

      <Transition
        // show={title === "Your shopping bag" ? false : isShowing}
        show={isShowing && !isMobile}
        onMouseEnter={() => setIsShowing(true)}
        onMouseLeave={() => setIsShowing(false)}
      >
        <MenuItems cartItems={cartItems} cartItemsCount={cartItemsCount} />
      </Transition>
    </Menu>
  );
};

export default LinkBag;
