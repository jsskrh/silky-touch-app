import { useEffect, useRef, useState } from "react";
import BrandGrid from "../components/Home/BrandGrid";
import MainCarousel from "../components/Home/MainCarousel";
import CallToAction from "../components/Home/CallToAction";
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

        <BrandGrid activeBrand={activeBrand} brand="gucci" />

        <CallToAction homeRef={homeRef} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();

  const activeBrand = await Product.find({
    brand: "Gucci",
  }).lean();

  return {
    props: {
      activeBrand: activeBrand
        .map(db.convertDocsToObj)
        .sort(() => 0.5 - Math.random())
        .slice(0, 4),
    },
  };
}
