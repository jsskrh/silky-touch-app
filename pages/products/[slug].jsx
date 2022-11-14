import { useRouter } from "next/router";
import Layout from "../../components/Layout/Layout";
import PageNavigation from "../../components/ProductPage/PageNavigation";
import ProductContent from "../../components/ProductPage/ProductContent";
import ProductImages from "../../components/ProductPage/ProductImages";
import Product from "../../models/product";
import db from "../../utils/db";

const style = {
  pdpTop: `md:flex`,
  pdpLeft: `flex-1`,
};

const productPage = ({ product }) => {
  const router = useRouter();
  // Fix path error in console
  const path = router.asPath;

  if (!product) {
    return (
      <Layout title="Product not found">
        <div>Product not found</div>
      </Layout>
    );
  }

  return (
    <Layout title={product.name}>
      <PageNavigation path={path} />

      <div className={style.pdpMain}>
        <div className={style.pdpTop}>
          <div className={style.pdpLeft}>
            <ProductImages product={product} />
          </div>
          <ProductContent product={product} />
        </div>

        <div className={style.recommendationsBlock}></div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();

  return {
    props: { product: product ? db.convertDocsToObj(product) : null },
  };
}

export default productPage;
