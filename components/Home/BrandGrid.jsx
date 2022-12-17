import Link from "next/link";
import { useEffect, useState } from "react";

const brandContent = {
  title: "Gucci",
  link: "/men",
  images: [
    "/homePage/brandGrid/grid1.avif",
    "/homePage/brandGrid/grid2.avif",
    "/homePage/brandGrid/grid3.avif",
    "/homePage/brandGrid/grid4.avif",
  ],
};

const style = {
  sectionContainer: `py-10 mb-20`,
  brandGrid: `grid md:grid-cols-2 md:gap-5 mb-10`,
  imageContainer: `w-full h-[630px] overflow-hidden`,
  image: `max-w-full`,
  brandDetails: `text-center`,
  title: `text-4xl uppercase`,
  button: `transition-all border px-[30px] py-[13px] w-52 text-xs font-bold uppercase mt-4 bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const BrandGrid = ({ activeBrand, brand }) => {
  return (
    <div className={style.sectionContainer}>
      <div className={style.brandGrid}>
        {activeBrand.map((product, index) => (
          <div className={style.imageContainer} key={index}>
            <img
              src={
                product.images.modelShowcaseFront
                  ? product.images.modelShowcaseFront
                  : product.images.modelFront
              }
              alt={product.name}
              className={style.image}
            />
          </div>
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