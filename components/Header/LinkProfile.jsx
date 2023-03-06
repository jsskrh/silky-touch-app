import { UserIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import NavIcon from "./NavIcon";

const style = {
  heroIcon: `h-4 w-4`,
  iconAndText: `flex`,
  loggedinUser: `pl-1 text-xs align-bottom`,
};

const LinkProfile = () => {
  const { status, data: session } = useSession();

  return (
    <NavIcon link="/profile">
      {status === "loading" ? (
        "Loading"
      ) : session?.user ? (
        <div className={style.iconAndText}>
          <UserIcon className={style.heroIcon}></UserIcon>
          <span className={style.loggedinUser}>
            Welcome, {session.user.name}
          </span>
        </div>
      ) : (
        <UserIcon className={style.heroIcon}></UserIcon>
      )}
    </NavIcon>
  );
};

export default LinkProfile;
