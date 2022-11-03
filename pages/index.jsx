import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import styles from "../styles/Home.module.css";
import data from "../utils/data";

const style = {
  productsGrid: `grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

export default function Home() {
  return (
    <Layout title="Home">
      <div className={style.productsGrid}>
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug} />
        ))}
      </div>
    </Layout>
  );
}
