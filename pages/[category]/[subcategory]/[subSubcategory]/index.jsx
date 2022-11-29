import { useRouter } from "next/router";
import Layout from "../../../../components/Layout/Layout";
import ProductItem from "../../../../components/ProductItem";
import PageNavigation from "../../../../components/ProductPage/PageNavigation";
import Product from "../../../../models/product";
import data from "../../../../utils/data";
import db from "../../../../utils/db";

const style = {
  queryBar: `px-6 font-bold text-xs border-y border-[#bdbdbd]`,
  queryBarInner: `py-6 flex justify-between`,
  productsGrid: `pt-4 grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

const subSubcategory = ({ products }) => {
  const router = useRouter();
  // Fix path error in console
  const path = router.asPath;
  const query = router.query;

  const category = data.catalogue[query.category];
  const subcategory = category[query.subcategory];
  const subSubcategory = subcategory[query.subSubcategory];

  //   console.log(router.query);

  return (
    <Layout
      path={path}
      title={subSubcategory.title}
      subtitle={subSubcategory.text}
      productsCatalogue
    >
      <div className={style.queryBar}>
        <div className={style.queryBarInner}>
          <span>Show Filters</span>
          <span>{products.length} Products</span>
          <span>Sort By</span>
        </div>
      </div>
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
  }).lean();

  return {
    props: { products: products.map(db.convertDocsToObj) },
  };
}

export default subSubcategory;