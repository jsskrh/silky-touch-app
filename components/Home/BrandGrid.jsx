import Link from "next/link";
import { useEffect, useState } from "react";
import BrandGridSlider from "./BrandGridSlider";

const style = {
  sectionContainer: `py-10 mb-20`,
  brandGrid: `grid md:grid-cols-2 md:gap-5 mb-10`,
  imageContainer: `w-full max-h-[630px] overflow-hidden`,
  image: `max-w-full`,
  brandDetails: `text-center`,
  title: `text-4xl uppercase`,
  button: `transition-all border px-[30px] py-[13px] w-52 text-xs font-bold uppercase mt-4 bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const BrandGrid = ({ activeBrand, brand }) => {
  return (
    <div className={style.sectionContainer}>
      <BrandGridSlider brand={activeBrand} />
      <div className={style.brandGrid}>
        {activeBrand.map((product, index) => (
          <Link
            href={`/${product.category}/${product.subcategory}/${product.subSubcategory}/${product.slug}`}
            key={index}
          >
            <div className={style.imageContainer} key={index}>
              <img
                src={
                  product.images.find(
                    (image) =>
                      image.type === "model showcase front" ||
                      image.type === "model front"
                  ).url
                }
                alt={product.name}
                className={style.image}
              />
            </div>
          </Link>
        ))}
      </div>
      <div className={style.brandDetails}>
        <h2 className={style.title}>{activeBrand[0].brand}</h2>
        <Link href={`/brands/${brand}`}>
          <button className={style.button}>Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default BrandGrid;
