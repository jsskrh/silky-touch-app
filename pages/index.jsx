import { useEffect, useRef, useState } from "react";
import BrandGrid from "../components/Home/BrandGrid";
import MainCarousel from "../components/Home/MainCarousel";
import CallToAction from "../components/Home/CallToAction";
import Layout from "../components/Layout/Layout";
import ProductItem from "../components/ProductCatalogue/ProductItem";
import Product from "../models/product";
import db from "../utils/db";

const style = {
  productsGrid: `grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

export default function Home({ products, activeBrand }) {
  const homeRef = useRef();

  // useEffect(() => {
  //   const slides = carouselContainerRef.current.querySelectorAll(".slide");
  //   let outerWrappers = carouselContainerRef.current.querySelectorAll(".outer");
  //   let innerWrappers = carouselContainerRef.current.querySelectorAll(".inner");
  //   const context = homeRef.current;
  //   let ctx = gsap.context(() => {
  //     gsap.set(outerWrappers, { yPercent: 100 });
  //     gsap.set(innerWrappers, { yPercent: -100 }), context;
  //   });

  //   return () => {
  //     ctx.revert();
  //   };
  // }, []);

  return (
    <Layout title="Home">
      <div ref={homeRef}>
        <MainCarousel homeRef={homeRef} />

        <BrandGrid activeBrand={activeBrand} brand="gucci" />

        <CallToAction homeRef={homeRef} />

        {/* <div className={style.productsCarousel}>
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div> */}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find({
    subSubcategory: "shirts",
  }).lean();

  const activeBrand = await Product.find({
    brand: "Gucci",
  }).lean();

  return {
    props: {
      products: products.map(db.convertDocsToObj),
      activeBrand: activeBrand.map(db.convertDocsToObj),
    },
  };
}
