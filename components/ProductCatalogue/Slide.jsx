const style = {};

const Slide = ({ image, name }) => {
  return <img src={image} alt={name} className={style.productImage} />;
};

export default Slide;
