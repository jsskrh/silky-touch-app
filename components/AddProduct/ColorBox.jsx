import React, { useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const style = {
  combobox: `relative`,
  comboButton: `absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  heroIcon: `h-4 w-4`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5] capitalize`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  listbox: `relative`,
  listboxHead: `flex justify-between items-center`,
  heroIcon: `h-4 w-4`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5]`,
  colors: `capitalize`,
};

const colors = ["red", "green", "blue", "yellow", "orange", "purple", "pink"];

const ColorBox = React.forwardRef((props, ref) => {
  const [selectedColors, setSelectedColors] = useState([]);

  const handleSelect = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  return (
    <Listbox
      value={props.value}
      onChange={props.onChange}
      as="div"
      className={style.combobox}
      refName={props.name}
      //   multiple
    >
      {({ open }) => (
        <>
          <Listbox.Button
            as="div"
            className={`${style.input} ${style.listboxHead}`}
          >
            <span classname={style.colors}>
              {/* {selectedColors.length === 0
                ? "Please select"
                : selectedColors.join(", ")} */}
              {props.value}
            </span>
            <span className={`${style.heroIcon} ${open && style.transform}`}>
              <ChevronDownIcon />
            </span>
          </Listbox.Button>
          <Listbox.Options className={style.options}>
            {colors.map((color, index) => (
              <Listbox.Option
                key={index}
                value={color}
                className={style.option}
              >
                {color}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

export default ColorBox;
