import Link from "next/link";
import ProductVariations from "../../components/ProductPage/ProductVariations";
import TitleBadge from "../../components/ProductPage/TitleBadge";
import PriceBadge from "../../components/ProductPage/PriceBadge";
import ProductActions from "../../components/ProductPage/ProductActions";
import ProductTabs from "./ProductTabs";
import ContactUs from "./ContactUs";

const style = {
  productContent: `md:ml-6 mx-auto w-[calc(100%-32px)] md:max-w-md md:grow-1`,
};

const ProductContent = ({ product }) => {
  return (
    <div className={style.productContent}>
      <TitleBadge product={product} />

      <PriceBadge product={product} />

      <ProductVariations />

      <ProductActions product={product} />

      <ProductTabs product={product} />

      <ContactUs />
    </div>
  );
};

export default ProductContent;
