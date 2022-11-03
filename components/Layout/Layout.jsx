import Head from "next/head";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const style = {
  wrapper: `flex min-h-screen flex-col justify-between`,
  mainContainer: `w-full my-auto px-4 mt-0`,
  mainInner: `container m-auto bg-white`,
};

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Luxury" : "Luxury"}</title>
        <meta name="description" content="Luxury Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={style.wrapper}>
        <Header />

        <main className={style.mainContainer}>
          <div className={style.mainInner}>{children}</div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
