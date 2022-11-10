import Link from "next/link";
import Slider from "./Slider";

const style = {
  productInfo: `w-full pt-4 pb-7 px-[2px]`,
  productInfoInner: `text-xs`,
  productName: `font-bold`,
  productPrice: `pt-2`,
};

const ProductItem = ({ product }) => {
  return (
    <div className={style.product}>
      <div className="productImageContainer">
        <Link href={`/products/${product.slug}`}>
          <Slider images={product.images} name={product.name} />
        </Link>
      </div>
      <div className={style.productInfo}>
        <div className={style.productInfoInner}>
          <div>
            <Link href={`/products/${product.slug}`}>
              <h3 className={style.productName}>{product.name}</h3>
            </Link>
          </div>
          <p className={style.productPrice}>${product.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
