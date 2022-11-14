import Layout from "../components/Layout/Layout";
import ProductItem from "../components/ProductItem";
import Product from "../models/product";
import db from "../utils/db";

const style = {
  productsGrid: `grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

export default function Home({ products }) {
  return (
    <Layout title="Home">
      <div className={style.productsGrid}>
        {products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();

  return {
    props: { products: products.map(db.convertDocsToObj) },
  };
}
