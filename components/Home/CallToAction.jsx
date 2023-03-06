import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import React, { useEffect, useLayoutEffect, useRef } from "react";

const largeImages = {
  men: { image: "/largeImages/men.jpg", link: "/men", title: "Men's Bags" },
};

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const style = {
  sectionContainer: `py-10`,
  imageContainer: `w-full relative mb-20 h-screen md:h-auto`,
  largeImage: `max-w-full max-h-full object-cover md:object-none h-full md:h-auto`,
  imageContent: `p-10 absolute top-0 text-center left-0 right-0 w-max mx-auto`,
  title: `text-4xl font-bold text-[#fff] uppercase`,
  button: `transition-all border bg-[#fff] px-[30px] py-[13px] w-full text-xs font-bold uppercase mt-4`,
};

const CallToAction = ({ homeRef }) => {
  const containerRef = useRef();
  const contentRef = useRef();

  useIsomorphicLayoutEffect(() => {
    const context = containerRef?.current;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: contentRef.current,
        scrub: true,
        pin: true,
        start: "bottom bottom",
        endTrigger: context,
        end: "bottom bottom",
        invalidateOnRefresh: false,
      });
    }, context);

    return () => ctx.revert();
  }, []);

  return (
    <div className={style.sectionContainer}>
      <div className={style.imageContainer} ref={containerRef}>
        <img
          src={largeImages.men.image}
          alt={largeImages.men.title}
          className={style.largeImage}
        />
        <div className={style.imageContent} ref={contentRef}>
          <h2 className={style.title}>{largeImages.men.title}</h2>
          <Link href={largeImages.men.link}>
            <button className={style.button}>Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
