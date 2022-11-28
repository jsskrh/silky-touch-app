import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import React, { useContext } from "react";
import { Store } from "../../utils/Store";

const style = {
  container: `flex justify-center mb-16 text-sm`,
  divider: `px-2`,
  link: `text-[#212121] hover:text-[#515151] relative after:bg-[#212121] hover:after:bg-[#515151] after:absolute after:content-[''] after:w-full after:bottom-[-2px] after:h-[1px] after:left-0 after:right-0`,
};

const Logout = () => {
  const { data: session } = useSession();
  const { dispatch } = useContext(Store);

  const logoutClickHandler = () => {
    Cookies.remove("cart");
    dispatch({ type: "CART_RESET" });
    signOut({ callbackUrl: "/login" });
  };

  return (
    <div className={style.container}>
      <span>Welcome, {session?.user.name}</span>
      <span className={style.divider}>|</span>
      <button className={style.link} onClick={logoutClickHandler}>
        Log out
      </button>
    </div>
  );
};

export default Logout;
