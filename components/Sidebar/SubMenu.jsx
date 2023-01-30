import Link from "next/link";
import CategoryListItem from "./CategoryListItem";
import { useEffect } from "react";

const style = {
  levelTwo: `fixed top-0 left-0 w-[339px] bottom-0 bg-[#ddd] transition duration-500 z-40`,
  levelTwoHidden: `translate-x-full`,
  levelTwoVisible: `translate-x-0`,
  previousMenu: `mx-6 border-b border-[#bdbdbd] py-5 mb-2 flex items-center cursor-pointer font-bold text-[#212121]`,
  titleContainer: `px-6 py-4`,
  menuTitle: `uppercase text-[#212121] hover:text-[#515151] font-bold`,
  arrowLeft: `border-b-2 border-l-2 h-2 w-2 border-[#212121] rotate-45 mr-2`,
};

const SubMenu = ({
  showSidebar,
  showLevel,
  setShowLevel,
  setShowSidebar,
  setShowFullOverlay,
  category,
  link,
}) => {
  useEffect(() => {
    setShowLevel(false);
  }, [showSidebar]);

  return (
    <div
      className={`${style.levelTwo} ${
        showLevel ? style.levelTwoVisible : style.levelTwoHidden
      }`}
    >
      <div className={style.previousMenu} onClick={() => setShowLevel(false)}>
        <div className={style.arrowLeft}></div>
        <span>Back</span>
      </div>
      <div className={style.titleContainer}>
        <Link
          href={link}
          onClick={() => {
            setShowLevel(false);
            setShowSidebar(false);
            setShowFullOverlay(false);
          }}
        >
          <span className={style.menuTitle}>{category.metadata.name}</span>
        </Link>
      </div>
      <ul>
        {Object.values(category.categories).map((subcategory) => (
          <CategoryListItem
            category={subcategory}
            link={`${link}/${
              subcategory.metadata
                ? subcategory.metadata.slug
                : subcategory.slug
            }`}
            setShowSidebar={setShowSidebar}
            setShowFullOverlay={setShowFullOverlay}
          />
        ))}
      </ul>
    </div>
  );
};

export default SubMenu;
