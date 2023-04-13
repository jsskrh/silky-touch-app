import { useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/Layout/Layout";
import ProductItem from "../../../components/ProductCatalogue/ProductItem";
import Product from "../../../models/product";
import db from "../../../utils/db";
import QueryBar from "../../../components/ProductCatalogue/QueryBar";
import Category from "../../../models/category";

const style = {
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
  heroContainer: `md:col-span-2`,
};

const subcategory = ({ products, subcategory }) => {
  const router = useRouter();

  // Fix path error in console
  const path = router.asPath;

  return (
    <Layout
      path={path}
      title={subcategory?.title}
      subtitle={subcategory?.subtitle}
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
  const { subcategory } = params;

  await db.connect();
  const products = await Product.find({
    category: "men",
    subcategory,
  })
    .sort({ createdAt: -1 })
    .lean();
  const filteredSubcategory = await Category.findOne({
    slug: subcategory,
  }).lean();

  if (filteredSubcategory.subcategories !== []) {
    filteredSubcategory.subcategories = filteredSubcategory.subcategories.map(
      (subcategory) => {
        return subcategory.toString();
      }
    );
  }

  const productsStringified = products.map(db.stringifyProducts);

  return {
    props: {
      products: productsStringified.map(db.convertDocsToObj),
      subcategory: db.convertDocsToObj(filteredSubcategory),
    },
  };
}

export default subcategory;
