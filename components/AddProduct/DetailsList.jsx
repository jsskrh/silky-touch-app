import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";

const style = {
  input: `w-full bg-[#fff] px-[15px] py-[10px] border border-[#d7d7d7] hover:border-[#515151] placeholder:italic`,
};

const DetailsList = ({ items, onAddItem, onRemoveItem }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim()) {
      onAddItem(inputValue.trim());
      setInputValue("");
    }
  };

  const handleRemoveItem = (item) => {
    onRemoveItem(item);
  };

  return (
    <div>
      <ul>
        {items.map((item) => (
          <li
            key={item}
            className={`justify-between flex items-center py-1 my-1`}
          >
            <span>{item}</span>
            <button
              type="button"
              onClick={() => handleRemoveItem(item)}
              className={`w-[45.6px] justify-center items-center flex`}
            >
              <XMarkIcon className={`h-6 w-6`} />
            </button>
          </li>
        ))}
      </ul>
      <div className={`flex`}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={style.input}
        />
        <button
          type="button"
          onClick={handleAddItem}
          className={`w-[45.6px] justify-center items-center flex bg-[#515151]`}
        >
          <PlusIcon className={`h-6 w-6 text-[#fff]`} />
        </button>
      </div>
    </div>
  );
};

export default DetailsList;
