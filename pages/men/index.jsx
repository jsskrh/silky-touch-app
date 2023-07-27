import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import ProductItem from "../../components/ProductCatalogue/ProductItem";
import Product from "../../models/product";
import db from "../../utils/db";
import QueryBar from "../../components/ProductCatalogue/QueryBar";
// import Category from "../../models/category";

const style = {
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

const category = ({ products }) => {
  const router = useRouter();

  // Fix path error in console
  const path = router.asPath;

  const category = {
    title: "Men",
    subtitle:
      "Get the quintessential Silky Touch look by pairing the latest runway styles with a statement bag and modern shoes. For the finishing touch, browse an array of luxurious accessories.",
  };

  return (
    <Layout
      path={path}
      title={category.title}
      subtitle={category.subtitle}
      productsCatalogue
    >
      <QueryBar productNo={products.length} />
      <div className={style.productsGrid}>
        {products.map((product) => (
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  await db.connect();
  const products = await Product.find().sort({ createdAt: -1 }).lean();

  const productsStringified = products.map(db.stringifyProducts);

  return {
    props: {
      products: productsStringified.map(db.convertDocsToObj),
    },
  };
}

export default category;
