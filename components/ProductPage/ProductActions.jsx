const style = {
  productActions: `mb-8`,
  addToCartContainer: `mb-8`,
  addToCart: `bg-[#212121] text-[#fafafa] border border-[#212121] px-4 py-[20px] w-full text-sm font-bold uppercase`,
  otherActions: `flex justify-center`,
  action: `m-4`,
};

const ProductActions = ({ product }) => {
  return (
    <div className={style.productActions}>
      <div className={style.addToCartContainer}>
        {product.countInStock >= 1 ? (
          <button className={style.addToCart}>Add To Bag</button>
        ) : (
          <button className={style.addToCart} disabled>
            Add To Bag
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
