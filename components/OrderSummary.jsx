import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../utils/Store";
import MiniBagItem from "./Header/MiniBagItem";
import { formatCurrency } from "../utils/currency";

const style = {
  orderSummary: `bg-[#f5f5f5] text-[0.80rem] mb-[22px]`,
  checkoutOSHeader: `border-b border-[#cecece] py-6 px-[22px] flex justify-between`,
  osTitle: `uppercase font-bold`,
  osLink: `underline font-base`,
  checkoutMiniCart: `px-[22px]`,
  checkoutMiniCartInner: `max-h-[374px] overflow-auto`,
  miniCartConfirm: `max-h-[258px]`,
  table: `w-full`,
  tableHead: `hidden`,
  checkoutOrderTotal: `pt-4 border-t border-[#212121]`,
  modContainer: `pb-4 px-[22px]`,
  modifier: `flex justify-between`,
  taxModifier: `mt-4`,
  totalContainer: `border-t border-[#d7d7d7] px-[22px] py-5 flex justify-between font-bold`,
};

const OrderSummary = ({
  confirmation,
  orderSummary,
  estimatedShipping,
  shippingPrice,
  tax,
  subtotal,
  estimatedTotal,
  totalPrice,
  orderItems,
}) => {
  const { state } = useContext(Store);
  let {
    cart: { cartItems },
  } = state;

  if (orderItems) {
    cartItems = orderItems;
  }

  return (
    <div className={style.orderSummary}>
      <header className={style.checkoutOSHeader}>
        <span className={style.osTitle}>
          {orderItems ? "Order Items" : "Order Summary"}
        </span>
        {!orderItems && !orderSummary && (
          <span className={style.osLink}>
            <Link href="/bag">Edit</Link>
          </span>
        )}
      </header>
      {!orderSummary && (
        <div className={style.checkoutMiniCart}>
          <div
            className={`${style.checkoutMiniCartInner} ${
              confirmation ? style.miniCartConfirm : ""
            }`}
          >
            <table className={style.table}>
              <thead className={style.tableHead}>
                <tr>
                  <th>Image</th>
                  <th>Details</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <MiniBagItem
                    key={index}
                    item={item}
                    orderItems={orderItems}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {(!orderItems || orderSummary) && (
        <div className={style.checkoutOrderTotal}>
          <div className={style.modContainer}>
            <div className={style.modifier}>
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            {estimatedShipping ? (
              <div className={style.modifier}>
                <span>Estimated Shipping</span>
                <span>from {formatCurrency(estimatedShipping)}</span>
              </div>
            ) : (
              <>
                <div className={style.modifier}>
                  <span>Shipping</span>
                  <span>{formatCurrency(shippingPrice)}</span>
                </div>
                <div className={`${style.modifier} ${style.taxModifier}`}>
                  <span>TAX</span>
                  <span>{formatCurrency(tax)}</span>
                </div>
              </>
            )}
          </div>
          {totalPrice ? (
            <div className={style.totalContainer}>
              <span>Total</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
          ) : (
            <div className={style.totalContainer}>
              <span>Estimated Total</span>
              <span>{formatCurrency(estimatedTotal)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default OrderSummary;
