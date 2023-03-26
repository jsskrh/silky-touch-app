import Slider from "../ProductCatalogue/Slider";

const style = {
  productImages: `grid-cols-1 lg:grid-cols-2 gap-1 hidden md:grid`,
  oddImage: `col-span-full w-full`,
  mobileImagesCont: `block md:hidden`,
  imagesPlaceholder: `h-[calc(100vh-68px-62px)] md:h-[calc(100vh-88px-62px)] bg-[#f2f2f2]`,
  sliderCont: `absolute top-[68px] md:top-[88px] right-0 left-0 w-screen h-[calc(100vh-68px-62px)] md:h-[calc(100vh-88px-62px)]`,
};

const ProductImages = ({ product, images }) => {
  return (
    <>
      <div className={style.productImages}>
        {images.map((image, index) => (
          <img
            src={image.url}
            alt={`${product} ${image.type}`}
            key={index}
            className={
              images.length % 2 === 1 && image === images[images.length - 1]
                ? style.oddImage
                : ""
            }
          />
        ))}
      </div>
      <div className={style.mobileImagesCont}>
        <div className={style.imagesPlaceholder}></div>
        <div className={style.sliderCont}>
          <Slider images={images} name={product} productPage={true} />
        </div>
      </div>
    </>
  );
};

export default ProductImages;
