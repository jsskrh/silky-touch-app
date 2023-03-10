import { useRouter } from "next/router";
import Layout from "../../../../components/Layout/Layout";
import ProductItem from "../../../../components/ProductCatalogue/ProductItem";
import PageNavigation from "../../../../components/ProductPage/PageNavigation";
import Product from "../../../../models/product";
import data from "../../../../utils/data";
import db from "../../../../utils/db";
import QueryBar from "../../../../components/ProductCatalogue/QueryBar";

const style = {
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

const subSubcategory = ({ products }) => {
  const router = useRouter();
  // Fix path error in console
  const path = router.asPath;
  const query = router.query;

  const category = data.catalogue[query.category];
  const subcategory = category?.categories[query.subcategory];
  const subSubcategory = subcategory?.categories[query.subSubcategory];

  //   console.log(router.query);

  return (
    <Layout
      path={path}
      title={subSubcategory?.title}
      subtitle={subSubcategory?.subtitle}
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
  const { category, subcategory, subSubcategory } = params;

  await db.connect();
  const products = await Product.find({
    category,
    subcategory,
    subSubcategory,
  })
    .sort({ createdAt: -1 })
    .lean();

  return {
    props: { products: products.map(db.convertDocsToObj) },
  };
}

export default subSubcategory;
