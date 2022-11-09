import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

const style = { navIcon: `flex items-center mx-2 pb-8`, heroIcon: `h-4 w-4` };

const LinkSearch = () => {
  return (
    <span className={style.navIcon}>
      <MagnifyingGlassIcon className={style.heroIcon}></MagnifyingGlassIcon>
    </span>
  );
};

export default LinkSearch;
