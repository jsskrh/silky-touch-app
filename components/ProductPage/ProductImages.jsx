const style = {
  productImages: `grid grid-cols-2 gap-1`,
  oddImage: `col-span-full w-full`,
};

const ProductImages = ({ product }) => {
  const imagesArr = Object.values(product.images);
  return (
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
  );
};

export default ProductImages;
