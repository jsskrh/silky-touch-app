import { useEffect, useRef, useState } from "react";
import BrandGrid from "../components/Home/BrandGrid";
import MainCarousel from "../components/Home/MainCarousel";
import CallToAction from "../components/Home/CallToAction";
import Layout from "../components/Layout/Layout";
import Product from "../models/product";
import db from "../utils/db";

const style = {
  productsGrid: `grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

export default function Home({ activeBrand }) {
  const homeRef = useRef();

  return (
    <Layout title="Home">
      <div ref={homeRef}>
        <MainCarousel homeRef={homeRef} />

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
