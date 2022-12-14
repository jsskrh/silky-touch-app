import Link from "next/link";
import TabLayout from "./TabLayout";

const style = {
  productTabs: `border-t botder-[#c0c0c0]`,
  tabContentHeader: `uppercase font-bold mb-4`,
  description: `pb-6`,
  details: `mb-2`,
  pDetail: `mb-2`,
  emphasizedLink: `hover:text-[#757575] underline`,
};

const ProductTabs = ({ product, tabState, setTabState }) => {
  return (
    <div className={style.productTabs}>
      <TabLayout title="Details" tabState={tabState} setTabState={setTabState}>
        <div className={style.description}>
          <p>{product.description}</p>
        </div>
        <div className={style.details}>
          <ul>
            {product.details.map((detail, index) => (
              <li key={index}>- {detail}</li>
            ))}
          </ul>
        </div>
        <p>
          item # <span>{product.sku}</span>
        </p>
      </TabLayout>

      <TabLayout
        title="Size & Fit"
        tabState={tabState}
        setTabState={setTabState}
      >
        <div className={style.details}>
          <ul>
            <li>- All sizes fit Italian standards</li>
          </ul>
        </div>
      </TabLayout>

      <TabLayout
        title="Shipping & Returns"
        tabState={tabState}
        setTabState={setTabState}
      >
        <h4 className={style.tabContentHeader}>
          COMPLIMENTARY GROUND SHIPPING ON ALL ORDERS.
        </h4>
        <div className={style.detail}>
          <p className={style.pDetail}>
            Standard delivery may take from 4 to 7 days.
          </p>
          <p className={style.pDetail}>
            We also offer two-day and next-day shipping services.
          </p>
          <p className={style.pDetail}>
            Personalized items might take longer to ship. For more details view{" "}
            <Link href="/shipping-and-delivery">
              <span className={style.emphasizedLink}>
                Shipping and Delivery section
              </span>
            </Link>
            .
          </p>
          <p className={style.pDetail}>
            For more details view{" "}
            <Link href="/shipping-and-delivery">
              <span className={style.emphasizedLink}>
                Shipping and Delivery section
              </span>
            </Link>
            .
          </p>
        </div>
      </TabLayout>
    </div>
  );
};

export default ProductTabs;
