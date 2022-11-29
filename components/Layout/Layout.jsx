import Head from "next/head";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PageNavigation from "../ProductPage/PageNavigation";

const style = {
  wrapper: `flex min-h-screen flex-col justify-between`,
  mainContainer: `w-full my-auto mt-0`,
  pageHeader: `bg-[#fafafa] text-xs px-6`,
  pageHead: `flex justify-center`,
  headInner: `p-4 pt-6 flex flex-col items-center`,
  title: `mb-6 font-bold text-3xl uppercase`,
  subtitle: `mb-2`,
  mainInner: `container m-auto text-[#212121] mb-16`,
};

const Layout = ({ title, children, bgColor, path, productsDisplay }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Luxury" : "Luxury"}</title>
        <meta name="description" content="Luxury Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.wrapper}>
        <Header title={title} />

        <main className={`${style.mainContainer} ${bgColor ? bgColor : ""}`}>
          {productsDisplay && (
            <div className={style.pageHeader}>
              <PageNavigation path={path} />
              <div className={style.pageHead}>
                <div className={style.headInner}>
                  <h1 className={style.title}>{title}</h1>
                  <p className={style.subtitle}>
                    Browse a selection of t-shirts and polo shirts for men,
                    crafted from comfortable and fine fabrics and embellished
                    with signature prints. Slip on a t-shirt with a pair of
                    Versace jeans and shoes .
                  </p>
                </div>
              </div>
            </div>
          )}
          <div className={style.mainInner}>{children}</div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
