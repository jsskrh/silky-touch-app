import Link from "next/link";

const style = { navIcon: `flex items-center mx-2 pb-8` };

const NavIcon = ({ children, link }) => {
  return (
    <span className={style.navIcon}>
      <Link href={link}>{children}</Link>
    </span>
  );
};

export default NavIcon;
