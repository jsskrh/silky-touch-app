import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useLayoutEffect, useRef } from "react";

const largeImages = {
  men: {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743240501/homepage/nbtrpb4rbegoffmddwwq.jpg",
    link: "/men",
    title: "Men's Shirts",
  },
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
        {/* <img
          src={largeImages.men.image}
          alt={largeImages.men.title}
          className={style.largeImage}
        /> */}
        <Image
          // unoptimized
          src={largeImages.men.image}
          alt={largeImages.men.title}
          className={style.largeImage}
          style={{
            //   maxWidth: "100%",
            //   maxHeight: "100%",
            //   height: "100%",
            objectFit: "cover",
          }}
          // objectFit="cover"
          // fill={true}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto", objectFit: "cover" }} // optional
        />
        <div className={style.imageContent} ref={contentRef}>
          <h2 className={style.title}>{largeImages.men.title}</h2>
          <Link href="/men/bags">
            <button className={style.button}>Shop Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;
