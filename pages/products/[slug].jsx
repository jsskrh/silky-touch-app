import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import ProductContent from "../../components/ProductPage/ProductContent";
import data from "../../utils/data";

const style = {
  navbar: `py-4 text-xs`,
  pdpTop: `flex`,
  productImages: `flex-1`,
};

const productPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((product) => product.slug === slug);
  // Fix path error in console
  const path = router.asPath;

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Layout title={product.name}>
      <div className={style.navbar}>
        <Link href="/">
          <span>Home</span>
        </Link>
        <span> | </span>
        <Link href={path}>
          <span>{product.name}</span>
        </Link>
      </div>

      <div className={style.pdpMain}>
        <div className={style.pdpTop}>
          <div className={style.productImages}></div>
          <ProductContent product={product} />
        </div>

        <div className={style.recommendationsBlock}></div>
      </div>
    </Layout>
  );
};

export default productPage;
