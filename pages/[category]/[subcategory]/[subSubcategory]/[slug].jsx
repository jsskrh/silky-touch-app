import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRouter } from "next/router";
import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Layout from "../../../../components/Layout/Layout";
import PageNavigation from "../../../../components/ProductPage/PageNavigation";
import ProductContent from "../../../../components/ProductPage/ProductContent";
import ProductImages from "../../../../components/ProductPage/ProductImages";
import Product from "../../../../models/product";
import db from "../../../../utils/db";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const style = {
  pdpMain: `md:mx-5`,
  pdpTop: `flex flex-col md:flex-row`,
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

  const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobile(false);
      } else {
        setIsMobile(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [tabState, setTabState] = useState(0);

  const productPageRef = useRef();
  const productContentRef = useRef();
  const productAllRef = useRef();

  useIsomorphicLayoutEffect(() => {
    const context = productPageRef?.current;

    let testHeight = productContentRef.current.clientHeight;

    let totalScroll = productAllRef.current.clientHeight - testHeight;

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      if (!isMobile) {
        ScrollTrigger.create({
          trigger: productAllRef.current,
          pin: productContentRef.current,
          scrub: true,
          start: "top 88px",
          end: "+=" + totalScroll,
        });
      }
    }, context);

    return () => {
      ctx.revert();
    };
  }, [tabState, isMobile]);

  return (
    <Layout title={product.name} path={path} productPage>
      <div className={style.pdpMain} ref={productPageRef}>
        <div className={style.pdpTop} ref={productAllRef}>
          <div className={style.pdpLeft}>
            <ProductImages images={product.images} product={product.name} />
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
    props: {
      product: product
        ? db.convertDocsToObj(db.stringifyProducts(product))
        : null,
    },
  };
}

export default productPage;
