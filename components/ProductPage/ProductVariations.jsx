import Link from "next/link";

const style = {
  productVariations: `mt-7`,
  attributeHeader: `mb-4 flex justify-between text-sm`,
  attributeTitle: `uppercase`,
  sizeGuide: `hover:text-[#757575]`,
  attributeValues: `mb-7 grid grid-cols-5 gap-2`,
  sizeValueContainer: `h-16`,
  sizeValue: `h-full w-full border border-[#c0c0c0]`,
};

const sizes = [46, 48, 50, 52, 54, 56, 58, 60, 62];

const ProductVariations = () => {
  return (
    <div className={style.productVariations}>
      <ul>
        <li className={style.attributeSize}>
          <div className={style.attributeHeader}>
            <h3 className={style.attributeTitle}>Size: IT</h3>
            <span className={style.sizeGuide}>
              <Link href="/size-guide">Size Guide</Link>
            </span>
          </div>
          <ul className={style.attributeValues}>
            {sizes.map((size) => (
              <li className={style.sizeValueContainer} key={size}>
                <button className={style.sizeValue}>
                  <span>{size}</span>
                </button>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default ProductVariations;
