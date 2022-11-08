import { CheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const style = {
  checkboxContainer: `mb-9`,
  checkboxWrapper: `inline-block relative`,
  rememberMeLabel: `flex items-center cursor-pointer`,
  realCheckbox: `absolute w-0 opacity-0`,
  fakeCheckbox: `border border-[#212121] h-4 w-4 mr-1 bg-[#eee]`,
};

const RememberMe = () => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className={style.checkboxContainer}>
      <div className={style.checkboxWrapper}>
        <label htmlFor="rememberMe" className={style.rememberMeLabel}>
          <input
            type="checkbox"
            id="rememberMe"
            className={style.realCheckbox}
            onClick={() => setCheckbox(!checkbox)}
          />
          <div className={style.fakeCheckbox}>
            {checkbox && <CheckIcon className={style.heroIcon} />}
          </div>
          <span>Remember me</span>
        </label>
      </div>
    </div>
  );
};

export default RememberMe;
