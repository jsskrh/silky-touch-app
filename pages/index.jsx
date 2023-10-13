import { useEffect, useRef, useState } from "react";
import BrandGrid from "../components/Home/BrandGrid";
import MainCarousel from "../components/Home/MainCarousel";
import CallToAction from "../components/Home/CallToAction";
import Partners from "../components/Home/Partners";
import Layout from "../components/Layout/Layout";
import Product from "../models/product";
import db from "../utils/db";

const style = {
  container: `static`,
  mainCarouselPlaceholder: `h-screen`,
  productsGrid: `grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

export default function Home({ activeBrand }) {
  const homeRef = useRef();

  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout title="Home">
      <div ref={homeRef} className={style.container}>
        <div className={style.mainCarouselPlaceholder}></div>
        <MainCarousel homeRef={homeRef} isMobile={isMobile} />

        {activeBrand.length !== 0 && (
          <BrandGrid activeBrand={activeBrand} brand="bags" />
        )}

        <CallToAction homeRef={homeRef} />

        <Partners />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const product1 = await Product.findById("64b950130ef0988aa23b2e34").lean();
  const product2 = await Product.findById("64b94825663c4d77d584240c").lean();
  const product3 = await Product.findById("64b960543fdaf4906c52767e").lean();
  const product4 = await Product.findById("64b955470ef0988aa23b2e6f").lean();
  const product5 = await Product.findById("64bc3ba80a25fdbbe406bf3f").lean();

  const activeBrand = [product1, product2, product3, product4, product5];

  const activeBrandStringified = activeBrand.map(db.stringifyProducts);

  return {
    props: {
      activeBrand: activeBrandStringified
        .map(db.convertDocsToObj)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4),
    },
  };
}
