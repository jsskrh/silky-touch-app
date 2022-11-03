import Link from "next/link";

const style = {
  productImage: `max-w-[100%] max-h-[100%]`,
  productInfo: `w-full pt-4 pb-7 px-[2px]`,
  productInfoInner: `text-xs`,
  productName: `font-bold`,
  productPrice: `pt-2`,
};

const ProductItem = ({ product }) => {
  return (
    <div className={style.product}>
      <div className="productImageContainer">
        <Link href={`/products//${product.slug}`}>
          <img
            src={product.image}
            alt={product.name}
            className={style.productImage}
          />
        </Link>
      </div>
      <div className={style.productInfo}>
        <div className={style.productInfoInner}>
          <div>
            <Link href={`/products//${product.slug}`}>
              <h3 className={style.productName}>{product.name}</h3>
            </Link>
          </div>
          <p className={style.productPrice}>{product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
