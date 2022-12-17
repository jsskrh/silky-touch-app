import Link from "next/link";
import Slider from "./Slider";

const style = {
  product: `flex flex-col justify-between`,
  productImageContainer: `flex flex-col flex-1`,
  productInfo: `w-full pt-4 pb-7 px-[2px]`,
  productInfoInner: `text-xs`,
  productName: `font-bold`,
  productPrice: `pt-2`,
};

const ProductItem = ({ product, slider }) => {
  return (
    <div className={style.product}>
      <div className={style.productImageContainer}>
        {slider ? (
          <Slider images={product.images} name={product.name} slider={slider} />
        ) : (
          <Link
            href={`/${product.category}/${product.subcategory}/${product.subSubcategory}/${product.slug}`}
            className={style.productImageContainer}
          >
            <Slider images={product.images} name={product.name} />
          </Link>
        )}
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
