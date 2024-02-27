import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const style = {
  combobox: `relative`,
  comboButton: `absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  heroIcon: `h-4 w-4`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5]`,
};

const brands = [
  "Versace",
  "Gucci",
  "Tom Ford",
  "Balenciaga",
  "Stefano Ricci",
  "Pal Zileri",
  "Cortigiani",
  "Brioni",
  "Mirial",
  "Deliga",
  "Nipmar",
  "Mauri",
  "Bilancioni",
  "Pasotti",
  "Artioli",
  "Moschino",
];

const BrandBox = React.forwardRef((props, ref) => {
  const [query, setQuery] = useState("");

  const filteredBrands =
    query === ""
      ? brands
      : brands.filter((brand) => {
          return brand
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""));
        });

  return (
    <Combobox
      value={props.value}
      onChange={props.onChange}
      as="div"
      className={style.combobox}
    >
      {({ open }) => (
        <>
          <div>
            <Combobox.Input
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Please select"
              displayValue={(brand) => brand}
              // as="div"
              className={`${style.input}`}
            />
            <Combobox.Button as="div" className={style.comboButton}>
              <span className={`${style.heroIcon} ${open && style.transform}`}>
                <ChevronDownIcon />
              </span>
            </Combobox.Button>
          </div>
          <Combobox.Options className={style.options}>
            {filteredBrands.map((brand, index) => (
              <Combobox.Option
                key={index}
                value={brand}
                className={style.option}
              >
                {brand}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
});

export default BrandBox;
