import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/Layout/Layout";
import ProductItem from "../../../components/ProductCatalogue/ProductItem";
import Product from "../../../models/product";
import data from "../../../utils/data";
import db from "../../../utils/db";
import QueryBar from "../../../components/ProductCatalogue/QueryBar";

const style = {
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
  heroContainer: `md:col-span-2`,
};

const subcategory = ({ products }) => {
  const router = useRouter();
  // Fix path error in console
  const path = router.asPath;
  const query = router.query;

  const category = data.catalogue[query.category];
  const subcategory = category?.categories[query.subcategory];

  //   console.log(router.query);

  return (
    <Layout
      path={path}
      title={subcategory?.metadata.title}
      subtitle={subcategory?.metadata.subtitle}
      productsCatalogue
    >
      <QueryBar productNo={products.length} />
      <div className={style.productsGrid}>
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { category, subcategory } = params;

  await db.connect();
  const products = await Product.find({
    category,
    subcategory,
  })
    .sort({ createdAt: -1 })
    .lean();

  const productsStringified = products.map(db.stringifyProducts);

  return {
    props: { products: productsStringified.map(db.convertDocsToObj) },
  };
}

export default subcategory;
