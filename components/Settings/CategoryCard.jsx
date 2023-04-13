import Link from "next/link";
import React from "react";

const style = {
  cardInner: `py-24 px-6 md:h-[545.6px] flex flex-col bg-[#fefefe] justify-between`,
  name: `font-semibold text-center`,
  title: `text-4xl font-bold text-center py-12`,
  subtitle: `text-center`,
  closeContainer: `flex justify-center`,
  close: `uppercase pt-0 p-2 font-bold text-xs flex cursor-pointer text-[#212121] hover:text-[#757575] relative hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:top-5 hover:after:h-[1px] after:left-0 after:right-0`,
};

const CategoryCard = ({ category }) => {
  return (
    <div className={style.card}>
      <div className={style.cardInner}>
        <div>
          <h2 className={style.name}>{category.name}</h2>
          <h3 className={style.title}>{category.title}</h3>
          <p className={style.subtitle}>{category.subtitle}</p>
        </div>
        {category.type === "subcategory" && (
          <div>
            <div className={style.closeContainer}>
              <Link href={`/admin/settings/catalogue/${category.slug}`}>
                <span
                  className={style.close}
                  //   onClick={() => setShowForm(false)}
                >
                  View
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryCard;
