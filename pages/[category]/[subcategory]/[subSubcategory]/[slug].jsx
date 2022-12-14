import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Layout from "../../../../components/Layout/Layout";
import PageNavigation from "../../../../components/ProductPage/PageNavigation";
import ProductContent from "../../../../components/ProductPage/ProductContent";
import ProductImages from "../../../../components/ProductPage/ProductImages";
import Product from "../../../../models/product";
import db from "../../../../utils/db";

const style = {
  pdpTop: `md:flex `,
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

  const [tabState, setTabState] = useState(0);

  const productPageRef = useRef();
  const productContentRef = useRef();
  const productAllRef = useRef();

  useEffect(() => {
    const context = productPageRef.current;

    let testHeight = productContentRef.current.clientHeight;

    let totalScroll = productAllRef.current.clientHeight - testHeight;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: productAllRef.current,
        pin: productContentRef.current,
        scrub: true,
        start: "top 88px",
        end: "+=" + totalScroll,
      });
    }, context);

    return () => {
      ctx.revert();
    };
  }, [tabState]);

  return (
    <Layout title={product.name} path={path} productPage>
      <div className={style.pdpMain} ref={productPageRef}>
        <div className={style.pdpTop} ref={productAllRef}>
          <div className={style.pdpLeft}>
            <ProductImages product={product} />
          </div>
          <ProductContent
            product={product}
            tabState={tabState}
            setTabState={setTabState}
            ref={productContentRef}
          />
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
