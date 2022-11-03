import Link from "next/link";

const style = {
  productTabs: `border-t botder-[#c0c0c0]`,
  tabGroup: `border-b botder-[#c0c0c0] text-sm`,
  groupHead: `flex justify-between py-4`,
  groupTitle: `font-bold`,
  tabContentHeader: `uppercase font-bold mb-4`,
  description: `pb-6`,
  details: `mb-2`,
  pDetail: `mb-2`,
  emphasizedLink: `hover:text-[#757575] underline`,
};

const ProductTabs = ({ product }) => {
  return (
    <div className={style.productTabs}>
      <div className={style.tabGroup}>
        <div className={style.groupHead}>
          <h3 className={style.groupTitle}>Details</h3>
          <span>O</span>
        </div>
        <div className={style.tabContent}>
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
        </div>
      </div>
      <div className={style.tabGroup}>
        <div className={style.groupHead}>
          <h3 className={style.groupTitle}>Size & Fit</h3>
          <span>O</span>
        </div>
        <div className={style.tabContent}>
          <div className={style.details}>
            <ul>
              <li>- All sizes fit Italian standards</li>
            </ul>
          </div>
        </div>
      </div>
      <div className={style.tabGroup}>
        <div className={style.groupHead}>
          <h3 className={style.groupTitle}>Shipping & Returns</h3>
          <span>O</span>
        </div>
        <div className={style.tabContent}>
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
              Personalized items might take longer to ship. For more details
              view{" "}
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
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
