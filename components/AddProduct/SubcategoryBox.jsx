import { Listbox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import react from "react";
import { slugify } from "../../utils/helpers";

const style = {
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  listbox: `relative`,
  listboxHead: `flex justify-between items-center`,
  heroIcon: `h-4 w-4`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5] capitalize`,
};

const subcategories = [
  "Clothing",
  "Bags",
  "Shoes",
  "Accessories",
  "Underwear and Beachwear",
  "Home & Lifestyle",
];

const SubcategoryBox = react.forwardRef((props, ref) => {
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
            {subcategories.map((subcategory, index) => (
              <Listbox.Option
                key={index}
                value={subcategory}
                className={style.option}
              >
                {subcategory}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </>
      )}
    </Listbox>
  );
});

export default SubcategoryBox;
