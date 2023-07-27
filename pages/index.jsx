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

  const activeBrand = await Product.find({
    subcategory: "bags",
  }).lean();

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
