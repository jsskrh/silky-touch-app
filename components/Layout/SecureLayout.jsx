import Head from "next/head";
import SecureFooter from "../Footer/SecureFooter";
import SecureHeader from "../Header/SecureHeader";

const style = {
  wrapper: `flex min-h-screen flex-col justify-between`,
  mainContainer: `w-full my-auto px-4 mt-0`,
  mainInner: `container m-auto bg-white text-[#212121]`,
};

const SecureLayout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title ? title + " - Silky Touch" : "Silky Touch"}</title>
        <meta name="description" content="Luxury Ecommerce website" />
        <link rel="icon" href="/logos/SILKY-TOUCH-LOGO.jpg" />
      </Head>

      <div className={style.wrapper}>
        <SecureHeader />

        <main className={style.mainContainer}>
          <div className={style.mainInner}>{children}</div>
        </main>

        <SecureFooter />
      </div>
    </>
  );
};

export default SecureLayout;
