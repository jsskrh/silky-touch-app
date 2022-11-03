const style = {
  titleBadgeContainer: `mb-2`,
  titleBadge: `text-xl font-bold uppercase mb-2`,
};

const TitleBadge = ({ product }) => {
  return (
    <div className={style.titleBadgeContainer}>
      <h1 className={style.titleBadge}>{product.name}</h1>
    </div>
  );
};

export default TitleBadge;
