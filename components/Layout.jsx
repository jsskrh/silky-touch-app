import Head from "next/head";
import Link from "next/link";

const style = {
  wrapper: `flex min-h-screen flex-col justify-between`,
  navbar: `flex justify-between items-center p-6`,
  navGrouping: `flex items-center`,
  brandName: `text-4xl font-bold uppercase mr-12`,
  navLink: `uppercase p-2 font-bold text-xs`,
  navIcon: `m-2`,
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
        <header>
          <nav className={style.navbar}>
            <div className={style.navGrouping}>
              <Link href="/">
                <h1 className={style.brandName}>Luxury</h1>
              </Link>
              <div>
                <Link href="/bags">
                  <span className={style.navLink}>Bags</span>
                </Link>
                <Link href="/women">
                  <span className={style.navLink}>Women</span>
                </Link>
                <Link href="/men">
                  <span className={style.navLink}>Men</span>
                </Link>
                <Link href="/home-decor">
                  <span className={style.navLink}>Home Décor</span>
                </Link>
                <Link href="/children">
                  <span className={style.navLink}>Children</span>
                </Link>
                <Link href="/jeans">
                  <span className={style.navLink}>Jeans Couture</span>
                </Link>
                <Link href="/stories">
                  <span className={style.navLink}>Stories</span>
                </Link>
                <Link href="/gifts">
                  <span className={style.navLink}>Gifts</span>
                </Link>
              </div>
            </div>
            <div className={style.navGrouping}>
              <div className={style.navIcon}>Search</div>
              <Link href="/wishlist">
                <span className={style.navIcon}>Wishlist</span>
              </Link>
              <Link href="/profile">
                <span className={style.navIcon}>Profile</span>
              </Link>
              <Link href="/shopping-bag">
                <span className={style.navIcon}>Shopping Bag</span>
              </Link>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer></footer>
      </div>
    </>
  );
};

export default Layout;
