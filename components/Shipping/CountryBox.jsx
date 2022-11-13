import { Combobox } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import data from "../../utils/data";

const style = {
  combobox: `relative`,
  comboButton: `absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  heroIcon: `h-4 w-4`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5]`,
};

const countries = data.countries;

const CountryBox = React.forwardRef((props, ref) => {
  const [query, setQuery] = useState("");

  const filteredCountries =
    query === ""
      ? countries
      : countries.filter((country) => {
          return country
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
              displayValue={(country) => country}
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
            {filteredCountries.map((country, index) => (
              <Combobox.Option
                key={index}
                value={country}
                className={style.option}
              >
                {country}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </>
      )}
    </Combobox>
  );
});

export default CountryBox;
