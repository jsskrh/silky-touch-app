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

  const product1 = await Product.findById("67e431cdf87bc4b60a4c9670").lean();
  const product2 = await Product.findById("64b960543fdaf4906c52767e").lean();
  const product3 = await Product.findById("65e58c8b7b3e1fd8cf8b2fbf").lean();
  const product4 = await Product.findById("64b98dff3fdaf4906c5276fb").lean();

  // const product1 = await Product.findById("64b950130ef0988aa23b2e34").lean();
  // const product2 = await Product.findById("64b94825663c4d77d584240c").lean();
  // const product3 = await Product.findById("64b960543fdaf4906c52767e").lean();
  // const product4 = await Product.findById("64b955470ef0988aa23b2e6f").lean();
  // const product5 = await Product.findById("64bc3ba80a25fdbbe406bf3f").lean();
  // const product6 = await Product.findById("6567845d29104c1ffa4c7d55").lean();
  // const product7 = await Product.findById("6567839ad6c0644ab3188f4e").lean();
  // const product8 = await Product.findById("6567802f29104c1ffa4c7d49").lean();
  // const product9 = await Product.findById("65dd9e19f6bc3c36359d3a29").lean();
  // const product10 = await Product.findById("6567824129104c1ffa4c7d4e").lean();
  // const product11 = await Product.findById("65e6af0947e8417038aaf433").lean();
  // const product12 = await Product.findById("65e5c33b5d1823422aaff82c").lean();
  // const product13 = await Product.findById("65e5b7b8ec3bb9ab3ea3143d").lean();
  // const product14 = await Product.findById("65e58b657b3e1fd8cf8b2fba").lean();
  // const product15 = await Product.findById("65e5653423263892ce683e75").lean();
  // const product16 = await Product.findById("65e55e1323263892ce683e63").lean();
  // const product17 = await Product.findById("65e55ce623263892ce683e5a").lean();
  // const product18 = await Product.findById("65e567ac23263892ce683e7c").lean();

  const activeBrand = [
    product1,
    product2,
    product3,
    product4,
    // product5,
    // product6,
    // product7,
    // product8,
    // product9,
    // product10,
    // product11,
    // product12,
    // product13,
    // product14,
    // product15,
    // product16,
    // product17,
    // product18,
  ];

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
