import Link from "next/link";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { PhoneIcon } from "@heroicons/react/24/outline";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

const style = {
  footer: `flex flex-col bg-[#212121] text-[#fff] md:pt-14 pb-10 z-10`,
  top: `flex flex-col lg:flex-row container m-auto px-6 md:pb-8 justify-between`,
  topLeft: `flex flex-col md:flex-row`,
  listContainer: `md:w-48 text-xs border-t border-[#424242] md:border-0`,
  heroIcon: `h-4 w-4 mr-1`,
  headerContainer: `flex py-6`,
  listHeader: `font-bold uppercase mb-3`,
  listItem: `text-sm md:text-xs mb-3`,
  topRight: `flex flex-col justify-between md:items-end`,
  currencyCont: `py-6 md:py-0 border-t border-[#424242] md:border-0`,
  languageAndLocation: `font-bold text-sm p-2`,
  socialsContainer: `flex items-center justify-between py-10 md:py-0 border-t border-[#424242] md:border-0`,
  socialsIconCont: `p-2`,
  socialsIcon: `h-5 w-5`,
  copyrightWrapper: `border-t border-[#424242] mx-4`,
  copyrightText: `p-6 pb-0 text-xs`,
};

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.top}>
        <div className={style.topLeft}>
          <div className={`${style.listContainer} border-t-0`}>
            <div className={style.headerContainer}>
              <MapPinIcon className={style.heroIcon} />
              <h3 className={style.listHeader}>Store Locator</h3>
            </div>
            <ul>
              <li className={style.listItem}>Find a Boutique</li>
              <li className={style.listItem}>Book an Appointment</li>
            </ul>
          </div>
          <div className={style.listContainer}>
            <div className={style.headerContainer}>
              <PhoneIcon className={style.heroIcon} />
              <h3 className={style.listHeader}>Customer Service</h3>
            </div>
            <ul>
              <li className={style.listItem}>Exclusive Services</li>
              <li className={style.listItem}>Contact Us</li>
              <li className={style.listItem}>Help / FAQs</li>
              <li className={style.listItem}>Order & Shipping</li>
              <li className={style.listItem}>Return & Refunds</li>
              <li className={style.listItem}>Track Your Order</li>
              <li className={style.listItem}>Authenticity</li>
            </ul>
          </div>
          <div className={style.listContainer}>
            <div className={style.headerContainer}>
              <UserGroupIcon className={style.heroIcon} />
              <h3 className={style.listHeader}>About Us</h3>
            </div>
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
            <div className={style.headerContainer}>
              <DocumentTextIcon className={style.heroIcon} />
              <h3 className={style.listHeader}>Legal</h3>
            </div>
            <ul>
              <li className={style.listItem}>Legal Notes</li>
              <li className={style.listItem}>Terms & Conditions</li>
              <li className={style.listItem}>General Conditions of Purchase</li>
              <li className={style.listItem}>
                Code of Business Conduct and Ethics
              </li>
              <li className={style.listItem}>Privacy Policy</li>
              <li className={style.listItem}>Cookie Policy</li>
            </ul>
          </div>
        </div>

        <div className={style.topRight}>
          <div className={style.currencyCont}>
            <Link href="/language">
              <span className={style.languageAndLocation}>
                Nigeria | EN (N)
              </span>
            </Link>
          </div>
          <div className={style.socialsContainer}>
            <div className={style.socialsIconCont}>
              <img
                src="/icons/instagramIcon.png"
                alt="Instagram Icon"
                className={style.socialsIcon}
              />
            </div>
            <div className={style.socialsIconCont}>
              <img
                src="/icons/twitterIcon.png"
                alt="Twitter Icon"
                className={style.socialsIcon}
              />
            </div>
            <div className={style.socialsIconCont}>
              <img
                src="/icons/whatsappIcon.png"
                alt="Whatsapp Icon"
                className={style.socialsIcon}
              />
            </div>
            <div className={style.socialsIconCont}>
              <img
                src="/icons/facebookIcon.png"
                alt="Facebook Icon"
                className={style.socialsIcon}
              />
            </div>
            <div className={style.socialsIconCont}>
              <img
                src="/icons/linkedinIcon.png"
                alt="LinkedIn Icon"
                className={style.socialsIcon}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={style.copyrightWrapper}>
        <p className={style.copyrightText}>?? Jesse Akorah 2022</p>
      </div>
    </footer>
  );
};

export default Footer;
