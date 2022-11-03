import Link from "next/link";
import ProductVariations from "../../components/ProductPage/ProductVariations";
import TitleBadge from "../../components/ProductPage/TitleBadge";
import PriceBadge from "../../components/ProductPage/PriceBadge";
import ProductActions from "../../components/ProductPage/ProductActions";
import ProductTabs from "./ProductTabs";
import ContactUs from "./ContactUs";

const style = {
  productContent: `ml-6`,
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
