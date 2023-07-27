import { useRouter } from "next/router";
import Layout from "../../../../components/Layout/Layout";
import ProductItem from "../../../../components/ProductCatalogue/ProductItem";
import PageNavigation from "../../../../components/ProductPage/PageNavigation";
import Product from "../../../../models/product";
import db from "../../../../utils/db";
import QueryBar from "../../../../components/ProductCatalogue/QueryBar";
import Category from "../../../../models/category";

const style = {
  productsGrid: `pt-4 mx-4 grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4`,
};

const subSubcategory = ({ products, subSubcategory }) => {
  const router = useRouter();

  // Fix path error in console
  const path = router.asPath;

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
          <ProductItem product={product} key={product._id} />
        ))}
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { subcategory, subSubcategory } = params;

  await db.connect();
  const products = await Product.find({
    category: "men",
    subcategory,
    subSubcategory,
  })
    .sort({ createdAt: -1 })
    .lean();
  const filteredSubSubcategory = await Category.findOne({
    slug: subSubcategory,
  }).lean();

  if (filteredSubSubcategory.subcategories !== []) {
    filteredSubSubcategory.subcategories =
      filteredSubSubcategory.subcategories.map((subcategory) => {
        return subcategory.toString();
      });
  }

  const productsStringified = products.map(db.stringifyProducts);

  return {
    props: {
      products: productsStringified.map(db.convertDocsToObj),
      subSubcategory: db.convertDocsToObj(filteredSubSubcategory),
    },
  };
}

export default subSubcategory;
