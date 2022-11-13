import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React from "react";

const style = {
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  listbox: `relative`,
  listboxHead: `flex justify-between`,
  heroIcon: `h-4 w-4`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5]`,
};

const prefixes = ["Mr", "Mrs", "Ms"];

const PrefixBox = React.forwardRef((props, ref) => {
  return (
    <Listbox
      value={props.value}
      onChange={props.onChange}
      as="div"
      className={style.listbox}
      refName={props.name}
    >
      {({ open }) => (
        <>
          <Listbox.Button
            as="div"
            className={`${style.input} ${style.listboxHead}`}
          >
            <span>{props.value}</span>
            <span className={`${style.heroIcon} ${open && style.transform}`}>
              <ChevronDownIcon />
            </span>
          </Listbox.Button>
          <Listbox.Options className={style.options}>
            {prefixes.map((prefix, index) => (
              <Listbox.Option
                key={index}
                value={prefix}
                className={style.option}
              >
                {prefix}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

export default PrefixBox;
