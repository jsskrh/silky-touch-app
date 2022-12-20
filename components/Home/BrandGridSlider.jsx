import gsap from "gsap";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const style = {
  brandSlider: `w-full overflow-x-hidden`,
  brandSliderInner: `pb-32 relative`,
  slideAction: `flex items-center absolute top-0 bottom-0 z-10`,
  leftAction: `left-6`,
  rightAction: `right-6`,
  heroIcon: `border-r-[3px] border-b-[3px] inline-block p-[30px] cursor-pointer`,
  leftIcon: `rotate-[135deg]`,
  rightIcon: `rotate-[-45deg]`,
  slider: `flex w-max`,
  slide: ``,
  slideContent: `w-screen container flex flex-col items-center`,
  imageContainer: `w-1/3`,
  image: `max-h-full max-w--full`,
  productBrand: `font-thin mt-8`,
  productName: `text-3xl font-thin`,
  separator: `my-4`,
  diamond: `border-[0.5px] border-[#212121] origin-center rotate-45 h-2 w-2`,
  button: `transition-all border px-[30px] py-[13px] w-52 text-xs font-bold uppercase bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const BrandGridSlider = ({ brand }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [slide, setSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(-1);

  const sliderRef = useRef(null);

  useEffect(() => {
    setSliderWidth(sliderRef.current.offsetWidth);
    setSlideWidth(sliderWidth / brand.length);
  }, [sliderWidth]);

  useEffect(() => {
    window.addEventListener("resize", () =>
      setSliderWidth(sliderRef.current.offsetWidth)
    );
    return () => {
      window.removeEventListener("resize", () =>
        setSliderWidth(sliderRef.current.offsetWidth)
      );
    };
  }, []);

  useEffect(() => {
    slide !== 0 && setAnimating(true);
    const context = sliderRef.current;
    const ctx = gsap.context(() => {
      const wrap = gsap.utils.wrap(0, brand.length);
      const slideIndex = wrap(slide);

      gsap.fromTo(
        sliderRef.current,
        { x: -slideWidth * currentSlide, duration: 2 },
        {
          x: -slideWidth * slideIndex,
          duration: 2,
          onComplete: () => setAnimating(false),
        }
      );

      setCurrentSlide(slideIndex);
    }, context);

    return () => {
      ctx.revert();
    };
  }, [slide]);

  useEffect(() => {
    const context = sliderRef.current;
    let ctx = gsap.context(() => {
      gsap.delayedCall(7, () => {
        setSlide(slide + 1);
      });
    }, context);

    return () => {
      ctx.revert();
    };
  }, [slide]);

  return (
    <div className={style.brandSlider}>
      <div className={style.brandSliderInner}>
        <div className={`${style.slideAction} ${style.leftAction}`}>
          <i
            className={`${style.heroIcon} ${style.leftIcon}`}
            onClick={() => !animating && setSlide(slide - 1)}
          ></i>
        </div>

        <div className={style.slider} ref={sliderRef}>
          {brand.map((product, index) => (
            <div className={`${style.slide} slide`} key={product.sku}>
              <div className={style.slideContent}>
                <div className={style.imageContainer}>
                  <img
                    src={product.images.primary}
                    alt={product.name}
                    className={style.image}
                  />
                </div>
                <h4 className={style.productBrand}>{product.brand}</h4>
                <h3 className={style.productName}>{product.name}</h3>
                <div className={style.separator}>
                  <div className={style.diamond}></div>
                </div>
                <Link
                  href={`/${product.category}/${product.subcategory}/${product.subSubcategory}/${product.slug}`}
                >
                  <button className={style.button}>Shop Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className={`${style.slideAction} ${style.rightAction}`}>
          <i
            className={`${style.heroIcon} ${style.rightIcon}`}
            onClick={() => !animating && setSlide(slide + 1)}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default BrandGridSlider;
