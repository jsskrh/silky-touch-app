import Link from "next/link";
import data from "../../utils/data";
import { useEffect, useState } from "react";
import SubMenu from "./SubMenu";

const style = {
  categoryListItem: `cursor-pointer flex py-4 px-6 justify-between items-center text-[#212121] hover:text-[#515151]`,
  category: `text-sm font-bold`,
  uppercase: `uppercase`,
  arrowRight: `border-t-2 border-r-2 h-2 w-2 border-[#212121] rotate-45`,
};

const CategoryListItem = ({
  category,
  showSidebar,
  setShowSidebar,
  setShowFullOverlay,
  link,
}) => {
  const [showLevelTwo, setShowLevelTwo] = useState(false);

  useEffect(() => {
    setShowLevelTwo(false);
  }, [showSidebar]);

  return (
    <>
      <li
        className={style.categoryListItem}
        onClick={() => setShowLevelTwo(true)}
      >
        <Link
          href={link}
          onClick={() => {
            setShowLevelTwo(false);
            setShowSidebar(false);
            setShowFullOverlay(false);
          }}
        >
          <span
            className={`${style.category} ${
              category.metadata && style.uppercase
            }`}
          >
            {category.metadata ? category.metadata.name : category.name}
          </span>
        </Link>
        {category.metadata && <span className={style.arrowRight}></span>}
      </li>
      {category.categories && (
        <SubMenu
          category={category}
          showLevel={showLevelTwo}
          setShowLevel={setShowLevelTwo}
          setShowSidebar={setShowSidebar}
          setShowFullOverlay={setShowFullOverlay}
          link={link}
          showSidebar={showSidebar}
        />
      )}
    </>
  );
};

export default CategoryListItem;
