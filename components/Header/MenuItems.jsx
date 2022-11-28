import { Menu } from "@headlessui/react";
import { formatCurrency } from "../../utils/currency";
import MiniBagTable from "./MiniBagTable";

const style = {
  rightMenuItems: `absolute right-0 origin-top-right max-w-sm w-96`,
  rightMenuItemsInner: `border border-[#fff] bg-[#f5f5f5] p-6`,
  miniBagHeader: `pt-4 pb-9 flex justify-center border-b border-[#dbdcdc] mx-[-24px]`,
  miniBagHeaderText: `uppercase font-bold text-lg`,
  divider: `border-b border-[#515151] mx-[-24px]`,
  miniCartSubtotal: `pt-6 flex justify-between text-xs`,
  value: `font-bold`,
};

const MenuItems = ({ cartItemsCount, cartItems }) => {
  const roundCurrency = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  return (
    <Menu.Items className={style.rightMenuItems}>
      <div className={style.rightMenuItemsInner}>
        <div className={style.miniBagHeader}>
          {cartItemsCount > 0 ? (
            <span className={style.miniBagHeaderText}>
              Shopping bag<span>: {cartItemsCount}</span>
            </span>
          ) : (
            <span className={style.miniBagHeaderText}>
              Your shopping bag is empty
            </span>
          )}
        </div>

        {cartItemsCount > 0 && (
          <>
            <MiniBagTable cartItems={cartItems} />
            <div className={style.divider}></div>
          </>
        )}

        <div className={style.miniCartTotals}>
          <div className={style.miniCartSubtotal}>
            <span className={style.label}>Subtotal</span>
            <span className={style.value}>
              {formatCurrency(
                roundCurrency(
                  cartItems.reduce((a, b) => a + b.quantity * b.price, 0)
                )
              )}
            </span>
          </div>
        </div>
      </div>
    </Menu.Items>
  );
};

export default MenuItems;
