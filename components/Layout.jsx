import Head from "next/head";
import Link from "next/link";

const style = {
  wrapper: `flex min-h-screen flex-col justify-between`,
  navbar: `flex justify-between items-center p-6`,
  navGrouping: `flex items-center`,
  brandName: `text-4xl font-bold uppercase mr-12`,
  navLink: `uppercase p-2 font-bold text-xs`,
  navIcon: `m-2`,
  mainContainer: `w-full my-auto px-4 mt-0`,
  mainInner: `container m-auto bg-white`,
  footer: `flex flex-col bg-[#212121] text-[#fff] pt-14 pb-10`,
  top: `flex container m-auto px-6 pb-8 justify-between`,
  topLeft: `flex`,
  listContainer: `w-48 text-xs`,
  listHeader: `font-bold uppercase mb-3`,
  listItem: `mb-3`,
  topRight: `flex flex-col justify-between items-end`,
  languageAndLocation: `font-bold text-sm p-2`,
  socialsContainer: `flex`,
  socialsIcon: `p-2`,
  copyrightWrapper: `border-t border-[#424242] mx-4`,
  copyrightText: `p-6 pb-0 text-xs`,
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
              <span className={style.navIcon}>Search</span>
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

        <main className={style.mainContainer}>
          <div className={style.mainInner}>{children}</div>
        </main>

        <footer className={style.footer}>
          <div className={style.top}>
            <div className={style.topLeft}>
              <div className={style.listContainer}>
                <h3 className={style.listHeader}>Store Locator</h3>
                <ul>
                  <li className={style.listItem}>Find a Boutique</li>
                  <li className={style.listItem}>Book an Appointment</li>
                </ul>
              </div>
              <div className={style.listContainer}>
                <h3 className={style.listHeader}>Customer Service</h3>
                <ul>
                  <li className={style.listItem}>Exclusive Services</li>
                  <li className={style.listItem}>Contact Us</li>
                  <li className={style.listItem}>Help / FAQs</li>
                  <li className={style.listItem}>Order & Shipping</li>
                  <li className={style.listItem}>Return & Refunds</li>
                  <li className={style.listItem}>Track You Order</li>
                  <li className={style.listItem}>Authenticity</li>
                </ul>
              </div>
              <div className={style.listContainer}>
                <h3 className={style.listHeader}>About Us</h3>
                <ul>
                  <li className={style.listItem}>Company Profile</li>
                  <li className={style.listItem}>Corporate Data</li>
                  <li className={style.listItem}>Investor Relations</li>
                  <li className={style.listItem}>Careers</li>
                  <li className={style.listItem}>Sitemap</li>
                  <li className={style.listItem}>Sitemap Products</li>
                </ul>
              </div>
              <div className={style.listContainer}>
                <h3 className={style.listHeader}>Legal</h3>
                <ul>
                  <li className={style.listItem}>Legal Notes</li>
                  <li className={style.listItem}>Terms & Conditions</li>
                  <li className={style.listItem}>
                    General Conditions of Purchase
                  </li>
                  <li className={style.listItem}>
                    Code of Business Conduct and Ethics
                  </li>
                  <li className={style.listItem}>Privacy Policy</li>
                  <li className={style.listItem}>Cookie Policy</li>
                </ul>
              </div>
            </div>

            <div className={style.topRight}>
              <div>
                <Link href="/language">
                  <span className={style.languageAndLocation}>
                    Nigeria | EN (N)
                  </span>
                </Link>
              </div>
              <div className={style.socialsContainer}>
                <div className={style.socialsIcon}>Icon</div>
                <div className={style.socialsIcon}>Icon</div>
                <div className={style.socialsIcon}>Icon</div>
                <div className={style.socialsIcon}>Icon</div>
              </div>
            </div>
          </div>

          <div className={style.copyrightWrapper}>
            <p className={style.copyrightText}>© Jesse Akorah</p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Layout;
