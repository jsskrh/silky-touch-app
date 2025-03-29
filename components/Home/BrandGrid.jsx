import Link from "next/link";
import Image from "next/image";
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

const images = [
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1743239524/homepage/etpmi3bpogqpljsnne8j.jpg",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1743239524/homepage/wxt9yirt0dslnmhjjgol.jpg",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1743239524/homepage/p57d1utnmwevdn8biuxi.jpg",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1743239524/homepage/ym0kyuelae1f1t4rdygw.jpg",
];

const BrandGrid = ({ activeBrand, brand }) => {
  return (
    <div className={style.sectionContainer}>
      <BrandGridSlider brand={activeBrand} />
      <div className={style.brandGrid}>
        {images.map((image, index) => (
          <div className={style.imageContainer} key={index}>
            <img src={image} alt={index} className={style.image} />
            {/* <Image
                unoptimized
                src={
                  product.images.find(
                    (image) =>
                      image.type === "model showcase front" ||
                      image.type === "model front" ||
                      image.type === "secondary"
                  ).url
                }
                alt={product.name}
                className={style.image}
                style={{ maxWidth: "100%" }}
                fill
              /> */}
          </div>
        ))}
        {/* {activeBrand.map((product, index) => (
          <Link
            href={`/${product.category}/${product.subcategory}/${product.subSubcategory}/${product._id}`}
            key={index}
          >
            <div className={style.imageContainer} key={index}>
              <img
                src={
                  product.images.find(
                    (image) =>
                      image.type === "model showcase front" ||
                      image.type === "model front" ||
                      image.type === "secondary"
                  ).url
                }
                alt={product.name}
                className={style.image}
              />
            </div>
          </Link>
        ))} */}
      </div>
      <div className={style.brandDetails}>
        <h2 className={style.title}>Fashion</h2>
        <Link href={`/men`}>
          <button className={style.button}>Shop Now</button>
        </Link>
      </div>
    </div>
  );
};

export default BrandGrid;
