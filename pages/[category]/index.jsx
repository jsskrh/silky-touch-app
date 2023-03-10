import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import ProductItem from "../../components/ProductCatalogue/ProductItem";
import Product from "../../models/product";
import data from "../../utils/data";
import db from "../../utils/db";
import QueryBar from "../../components/ProductCatalogue/QueryBar";

const style = {
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

const category = ({ products }) => {
  const router = useRouter();
  // Fix path error in console
  const path = router.asPath;
  const query = router.query;

  const category = data.catalogue[query.category];

  //   console.log(router.query);

  return (
    <Layout
      path={path}
      title={category.metadata.title}
      subtitle={category.metadata.subtitle}
      productsCatalogue
    >
      <QueryBar productNo={products.length} />
      <div className={style.productsGrid}>
        {products.map((product, index) => (
          <>
            {/* {(index + 1) % 6 === 0 && (
              <div className={style.heroContainer}></div>
            )} */}
            <ProductItem product={product} key={product.slug} />
          </>
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { category } = params;

  await db.connect();
  const products = await Product.find({
    category,
  })
    .sort({ createdAt: -1 })
    .lean();

  return {
    props: { products: products.map(db.convertDocsToObj) },
  };
}

export default category;
