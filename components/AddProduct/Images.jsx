import { Listbox } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";

const style = {
  listbox: `relative`,
  listboxHead: `flex justify-between items-center`,
  heroIcon: `h-4 w-4 ml-10`,
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
  transform: `transform rotate-180`,
  options: `absolute bg-[#fff] w-full max-h-60 overflow-y-scroll z-10`,
  option: `px-[15px] py-[10px] cursor-pointer hover:bg-[#f5f5f5] capitalize`,
};

const Images = ({ images, onAddImage, onRemoveImage }) => {
  const [inputValue, setInputValue] = useState("");
  const [imageType, setImageType] = useState("Select");

  const handleAddImage = () => {
    if (inputValue.trim() && imageType !== "" && imageType !== "Select") {
      onAddImage({ type: imageType, url: inputValue.trim() });
      setInputValue("");
      setImageType("Select");
    }
  };

  const handleRemoveImage = (image) => {
    onRemoveImage(image);
  };

  return (
    <div>
      <ul>
        {images.map((image, index) => (
          <li
            key={index}
            className={`justify-between flex items-center py-1 my-1`}
          >
            <span>
              {image.type}: {image.url}
            </span>
            <button
              type="button"
              onClick={() => handleRemoveImage(image)}
              className={`w-[45.6px] justify-center items-center flex`}
            >
              <XMarkIcon className={`h-6 w-6`} />
            </button>
          </li>
        ))}
      </ul>
      <div className={`flex`}>
        <Listbox
          //   value={props.value}
          onChange={setImageType}
          as="div"
          className={`${style.listbox} min-w-[160px]`}
          //   refName={props.name}
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
                  {imageType}
                </span>
                <span
                  className={`${style.heroIcon} ${open && style.transform}`}
                >
                  <ChevronDownIcon />
                </span>
              </Listbox.Button>
              <Listbox.Options className={style.options}>
                {["primary", "secondary", "tertiary"].map((type, index) => (
                  <Listbox.Option
                    key={index}
                    value={type}
                    className={style.option}
                  >
                    {type}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
        <input
          type="file"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={`${style.input} flex-1 py-[7px] items-center max-h-[45.6px]`}
        />
        <button
          type="button"
          onClick={handleAddImage}
          className={`w-[45.6px] justify-center items-center flex bg-[#515151] max-h-[45.6px]`}
        >
          <PlusIcon className={`h-6 w-6 text-[#fff]`} />
        </button>
      </div>
    </div>
  );
};

export default Images;
