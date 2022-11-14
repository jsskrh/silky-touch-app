const style = {
  productImages: `grid grid-cols-2 gap-1`,
  oddImage: `col-span-full w-full`,
};

const ProductImages = ({ product }) => {
  return (
    <div className={style.productImages}>
      {product.images.map((image, index) => (
        <img
          src={Object.values(image)[0]}
          alt={product.name}
          key={index}
          className={
            product.images.length % 2 === 1 &&
            image === product.images[product.images.length - 1]
              ? style.oddImage
              : ""
          }
        />
      ))}
    </div>
  );
};

export default ProductImages;
