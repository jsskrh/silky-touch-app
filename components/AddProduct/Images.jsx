import { Listbox } from "@headlessui/react";
import {
  ChevronDownIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import React, { useState, useRef } from "react";

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
  const [inputValue, setInputValue] = useState(null);
  const [imageType, setImageType] = useState("Select");

  const inputRef = useRef(null);

  const handleAddImage = () => {
    if (inputValue && imageType !== "" && imageType !== "Select") {
      onAddImage({ type: imageType, url: inputValue });
      setInputValue(null);
      inputRef.current.value = null;
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
              {image.type}: {image.url.name}
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
          onChange={setImageType}
          as="div"
          className={`${style.listbox} min-w-[160px]`}
        >
          {({ open }) => (
            <>
              <Listbox.Button
                as="div"
                className={`${style.input} ${style.listboxHead}`}
              >
                <span className={style.colors}>{imageType}</span>
                <span
                  className={`${style.heroIcon} ${open && style.transform}`}
                >
                  <ChevronDownIcon />
                </span>
              </Listbox.Button>
              <Listbox.Options className={style.options}>
                {[
                  "primary",
                  "secondary",
                  "tertiary",
                  "model front",
                  "model back",
                  "material closeUp",
                ].map((type, index) => (
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
          onChange={(e) => {
            const file = e.target.files[0];
            setInputValue(file);
          }}
          ref={inputRef}
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
