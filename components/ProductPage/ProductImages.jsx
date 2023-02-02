import ProductItem from "../ProductCatalogue/ProductItem";
import Slider from "../ProductCatalogue/Slider";

const style = {
  productImages: `grid-cols-1 lg:grid-cols-2 gap-1 hidden md:grid`,
  oddImage: `col-span-full w-full`,
  mobileImagesCont: `block md:hidden`,
  imagesPlaceholder: `h-[calc(100vh-68px-62px)] md:h-[calc(100vh-88px-62px)] bg-[#f2f2f2]`,
  sliderCont: `absolute top-[68px] md:top-[88px] right-0 left-0 w-screen h-[calc(100vh-68px-62px)] md:h-[calc(100vh-88px-62px)]`,
};

const ProductImages = ({ product }) => {
  const imagesArr = Object.values(product.images);
  return (
    <>
      <div className={style.productImages}>
        {imagesArr.map((image, index) => (
          <img
            src={image}
            alt={product.name}
            key={index}
            className={
              imagesArr.length % 2 === 1 &&
              image === imagesArr[imagesArr.length - 1]
                ? style.oddImage
                : ""
            }
          />
        ))}
      </div>
      <div className={style.mobileImagesCont}>
        <div className={style.imagesPlaceholder}></div>
        <div className={style.sliderCont}>
          <Slider
            images={product.images}
            name={product.name}
            productPage={true}
          />
        </div>
      </div>
    </>
  );
};

export default ProductImages;
