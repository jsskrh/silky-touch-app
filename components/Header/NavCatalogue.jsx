import React, { useEffect, useRef, useState } from "react";
import data from "../../utils/data";
import Link from "next/link";
import gsap from "gsap";
// import Category from "../../models/category";
// import db from "../../utils/db";

const style = {
  navLink: `uppercase pt-0 p-2 font-bold text-xs flex pb-9 text-[#212121] hover:text-[#757575] relative hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:top-5 hover:after:h-[1px] after:left-0 after:right-0`,
};

const NavCatalogue = ({ category, categoryItems }) => {
  const contRef = useRef();

  const catalogueData = data.catalogue.men.categories[category].categories;
  const catalogueKeys = Object.keys(catalogueData);

  // const [currentCategory, setCurrentCategory] = useState();

  // useEffect(async () => {
  //   await db.connect();
  //   const cat = await Category.findOne({ slug: category });
  //   console.log(cat);
  //   await db.disconnect();
  // }, []);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const context = contRef?.current;

    if (!open) return;

    const ctx = gsap.context(() => {
      const hover = gsap.fromTo(
        ".catalogue-menu",
        { yPercent: -100, display: "none" },
        { yPercent: 0, display: "flex" }
      );
      context.addEventListener("mouseenter", () => hover.play());
      context.addEventListener("mouseleave", () => hover.reverse());
    }, context);

    return () => ctx.revert();
  }, [open]);

  return (
    <div
      className="inline-block relative"
      ref={contRef}
      onMouseEnter={() => setOpen(true)}
    >
      <Link href={`/men/${category}`}>
        <span className={style.navLink}>
          {data.catalogue.men.categories[category].metadata.name}
        </span>
      </Link>
      <div
        className={`catalogue-menu border-t border-[#f5f5f5] px-6 pt-8 pb-16 absolute left-0 bg-[#fff] z-[-1] hidden`}
      >
        <div>
          <div className="flex">
            <div className="mr-8 w-44 box-content">
              {catalogueKeys.map((levelOne) => (
                <Link href={`/men/${category}/${levelOne}`} key={levelOne}>
                  <h3 className="uppercase mb-3 font-bold text-xs hover:text-[#757575]">
                    {catalogueData[levelOne].name}
                  </h3>
                </Link>
              ))}
            </div>
            {/* <div className="w-[212px]">
              <div className="h-[297px]"></div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavCatalogue;

export async function getServerSideProps() {
  await db.connect();

  const mongoItems = await Product.find({
    category: "men",
  })
    .limit(4)
    .lean();

  const categoryImages = [];

  mongoItems.map((item) => categoryImages.push(item.images.primary));

  return {
    props: {
      categoryItems: mongoItems.map(db.convertDocsToObj),
    },
  };
}
