import Link from "next/link";
import ProductVariations from "../../components/ProductPage/ProductVariations";
import TitleBadge from "../../components/ProductPage/TitleBadge";
import PriceBadge from "../../components/ProductPage/PriceBadge";
import ProductActions from "../../components/ProductPage/ProductActions";
import ProductTabs from "./ProductTabs";
import ContactUs from "./ContactUs";
import { forwardRef } from "react";

const style = {
  productContent: `mt-10 md:mt-0 md:ml-6 mx-auto w-[calc(100%-32px)] md:max-w-md md:grow-1 md:max-h-fit`,
};

const ProductContent = forwardRef(({ product, tabState, setTabState }, ref) => {
  return (
    <div className={`${style.productContent} product-content`} ref={ref}>
      <TitleBadge product={product} />

      <PriceBadge product={product} />

      <ProductVariations />

      <ProductActions product={product} />

      <ProductTabs
        product={product}
        tabState={tabState}
        setTabState={setTabState}
      />

      <ContactUs />
    </div>
  );
});

export default ProductContent;
