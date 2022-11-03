const style = {
  priceBadgeContainer: `mb-2`,
  priceBadge: `text-xl font-bold`,
};

const PriceBadge = ({ product }) => {
  return (
    <div className={style.priceBadgeContainer}>
      <span className={style.priceBadge}>${product.price}</span>
    </div>
  );
};

export default PriceBadge;
