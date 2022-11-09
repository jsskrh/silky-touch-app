import { HeartIcon } from "@heroicons/react/24/outline";
import NavIcon from "./NavIcon";

const style = { heroIcon: `h-4 w-4` };

const LinkWishlist = () => {
  return (
    <NavIcon link="/wishlist">
      <HeartIcon className={style.heroIcon}></HeartIcon>
    </NavIcon>
  );
};

export default LinkWishlist;
