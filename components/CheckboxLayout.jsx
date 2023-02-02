import { CheckIcon } from "@heroicons/react/24/solid";
import { useState } from "react";

const style = {
  checkboxWrapper: `inline-block relative`,
  checkboxLabel: `flex items-center cursor-pointer`,
  realCheckbox: `absolute w-0 opacity-0`,
  fakeCheckbox: `border border-[#212121] h-4 w-4 mr-1 bg-[#eee]`,
  checkboxText: `flex-1`,
};

const CheckboxLayout = ({ children, id }) => {
  const [checkbox, setCheckbox] = useState(false);

  return (
    <div className={style.checkboxWrapper}>
      <label htmlFor={id} className={style.checkboxLabel}>
        <input
          type="checkbox"
          id={id}
          className={style.realCheckbox}
          onClick={() => setCheckbox(!checkbox)}
        />
        <div className={style.fakeCheckbox}>
          {checkbox && <CheckIcon className={style.heroIcon} />}
        </div>
        <span className={style.checkboxText}>{children}</span>
      </label>
    </div>
  );
};

export default CheckboxLayout;
