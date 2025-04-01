import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const heroes = [
  {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743238388/homepage/i2rwkdtwd12io6sqs2eh.jpg",
    link: "shoes",
    caption: "Step in Style",
  },
  {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743240500/homepage/cjnppccrw2nwjv1fwovd.jpg",
    link: "accessories",
    caption: "Luxury Accessories",
  },
  {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743240503/homepage/ixp5xm3vkjpherffphvg.jpg",
    link: "clothing/shirts",
    caption: "Specially Crafted",
  },
];

const mHeroes = [
  {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743238387/homepage/bwzjk4heltfdddogvlc8.jpg",
    link: "shoes",
    caption: "Step out in Style",
  },
  {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743240500/homepage/tn8e7vz5glnqaewozso1.jpg",
    link: "accessories",
    caption: "Luxury Accessories",
  },
  {
    image:
      "https://res.cloudinary.com/dixuzyoht/image/upload/v1743240500/homepage/cpqk9jqprrypascyvraz.jpg",
    link: "clothing/shirts",
    caption: "Specially Crafted",
  },
];

gsap.registerPlugin(ScrollTrigger);

const style = {
  carouselContainer: `absolute top-[68px] md:top-[88px] right-0 left-0 h-[calc(100vh-68px)] md:h-[calc(100vh-88px)] overflow-hidden`,
  // carouselContainer: `absolute top-[68px] md:top-[88px] right-0 left-0 w-[calc(100vw-${scrollbarWidth})] h-[calc(100vh-68px)] md:h-[calc(100vh-88px)] overflow-hidden`,
  carouselSlide: `absolute top-0 invisible h-full`,
  outer: `h-full overflow-y-hidden`,
  carouselImage: `max-h-full h-full w-full object-cover`,
  // carouselSlide: `absolute top-0 invisible`,
  captionContainer: `absolute  bottom-20 left-5 md:left-10 text-[#fff] text-[36px] md:text-[3rem] lg:text-[4rem] max-w-[550px] uppercase font-['Cormorant-Garamond']`,
  captionWord: `inline-block mr-4`,
  captionChar: `inline-block mr-1`,
  carouselIndicatorContainer: `absolute bottom-0 left-0 right-0 flex z-10`,
  carouselIndicator: `flex mx-auto mb-3 items-center`,
  indicatorBox: `m-[5px] cursor-pointer`,
  inactiveBox: `h-1 w-1 bg-[#fff]`,
  activeBox: `h-3 w-3 border border-[#fff]`,
};

// background: linear-gradient(to bottom,#25211e 0,rgba(37,33,30,0) 100%);
// bg-[linear-gradient(to_bottom,#25211e_0,rgba(37,33,30,0)_20%)]
// box-shadow: 0 -120px 47px -70px rgba(0,0,0,.3) inset;

const MainCarousel = ({ homeRef, isMobile }) => {
  const [slide, setSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [splitCaptions, setSplitCaptions] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [scrollbarWidth, setScrollbarWidth] = useState();
  const [heroItems, setHeroItems] = useState([]);
  const slideRef = useRef();
  const carouselContainerRef = useRef();
  const captionContainerRef = useRef();

  const indicatorRef = useRef();

  useEffect(() => {
    const scrollbar = window.innerWidth - document.body.clientWidth;
    setScrollbarWidth(`${scrollbar}px`);
  }, []);

  // const [isMobile, setIsMobile] = useState();

  useEffect(() => {
    if (!isMobile) {
      setHeroItems(heroes);
    } else {
      setHeroItems(mHeroes);
    }
  }, [isMobile]);

  useEffect(() => {
    let captions = [];
    let wordArr = [];

    const pushCaptions = () => {
      heroItems.map((hero) => {
        // let newText = `Shop ${hero.caption}`;
        if (hero.caption) {
          captions.push(hero.caption);
        }
      });
      captions.map((caption) => {
        if (caption) {
          wordArr.push(caption.split(" "));
        }
      });
      wordArr.map((caption, i) => {
        caption.map((word, j) => {
          wordArr[i][j] = word.split("");
        });
      });
    };
    pushCaptions();

    setSplitCaptions(wordArr);
  }, [isMobile]);

  useEffect(() => {
    const slides = carouselContainerRef.current.querySelectorAll(".slide");
    let outerWrappers = carouselContainerRef.current.querySelectorAll(".outer");
    let innerWrappers = carouselContainerRef.current.querySelectorAll(".inner");
    outerWrappers = gsap.utils.toArray(outerWrappers);
    innerWrappers = gsap.utils.toArray(innerWrappers);
    const images =
      carouselContainerRef.current.querySelectorAll(".carousel-image");
    const context = homeRef.current;

    let captions = carouselContainerRef.current.querySelectorAll(".caption");
    let captionChars =
      carouselContainerRef.current.querySelectorAll(".caption-char");
    captions = gsap.utils.toArray(captions);
    captionChars = gsap.utils.toArray(captionChars);

    let ctx = gsap.context(() => {
      let wrap = gsap.utils.wrap(0, slides.length);

      // gsap.set(outerWrappers, { yPercent: 100 });
      // gsap.set(innerWrappers, { yPercent: -100 });

      const goToSlide = (index, direction) => {
        const slideIndex = wrap(index);
        // console.log(slideIndex, currentSlide, slide);
        setAnimating(true);
        let fromTop = slide < currentSlide;
        let dFactor = fromTop ? -1 : 1;
        const tl = gsap.timeline({
          defaults: { duration: 1.25, ease: "power1.inOut" },
          onComplete: () => setAnimating(false),
        });

        // let currentIndex = -1;
        if (currentSlide >= 0) {
          // The first time this function runs, current is -1
          gsap.set(slides[currentSlide], { autoAlpha: 1, zIndex: 0 });
          tl.to(images[currentSlide], { yPercent: -15 * dFactor }).set(
            slides[currentSlide],
            { autoAlpha: 0 }
          );
        }

        gsap.set(slides[slideIndex], { autoAlpha: 1, zIndex: 1 });
        if (slide > 0 || currentSlide >= 0) {
          tl.fromTo(
            [outerWrappers[slideIndex], innerWrappers[slideIndex]],
            {
              yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor),
            },
            {
              yPercent: 0,
            },
            "0"
          )
            .fromTo(
              images[slideIndex],
              { yPercent: 15 * dFactor },
              { yPercent: 0 },
              "0"
            )
            .fromTo(
              captions[slideIndex].querySelectorAll(".caption-char"),
              {
                autoAlpha: 0,
                yPercent: 45 * dFactor,
              },
              {
                autoAlpha: 1,
                yPercent: 0,
                duration: 1.1,
                ease: "power2",
                stagger: {
                  each: 0.02,
                  from: "random",
                },
              },
              0.2
            );
        }

        setCurrentSlide(slideIndex);
      };

      goToSlide(slide, 1);
    }, context);

    return () => {
      ctx.revert();
    };
  }, [slide]);

  useEffect(() => {
    const context = homeRef.current;
    let ctx = gsap.context(() => {
      gsap.delayedCall(5, () => {
        setSlide(slide + 1);
      });
    }, context);

    return () => {
      ctx.revert();
    };
  }, [slide]);

  // useEffect(() => {
  //   // calculate maximum distance the indicator can travel
  //   const containerHeight = carouselContainerRef.current.offsetHeight;
  //   const viewportHeight = window.innerHeight;
  //   const maxDistance = containerHeight - viewportHeight;

  //   // animate indicatorRef to fixed position at bottom of viewport
  //   gsap.timeline().to(indicatorRef.current, {
  //     y: maxDistance,
  //     duration: 0.5,
  //   });

  //   // add scroll event listener to parent div
  //   const handleScroll = () => {
  //     const scrollTop = carouselContainerRef.current.scrollTop;
  //     gsap.to(indicatorRef.current, {
  //       y: maxDistance - scrollTop,
  //       duration: 0.3,
  //     });
  //   };
  //   carouselContainerRef.current.addEventListener("scroll", handleScroll);

  //   return () => {
  //     // remove scroll event listener on unmount
  //     carouselContainerRef.current.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  const timelineRef = useRef(null);
  const triggerRef = useRef(null);
  useEffect(() => {
    // check if the plugin is enabled before creating the trigger
    if (ScrollTrigger) {
      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power1.out" },
      });

      const container = carouselContainerRef.current;
      const indicator = indicatorRef.current;

      const { bottom: indicatorBottom } = indicator.getBoundingClientRect();
      const { bottom: containerBottom } = container.getBoundingClientRect();

      timeline.fromTo(
        indicator,
        { position: "fixed", bottom: 0 },
        { position: "absolute", bottom: containerBottom - indicatorBottom }
      );

      timeline.duration(containerBottom - indicatorBottom);

      const trigger = ScrollTrigger.create({
        trigger: container,
        start: "top bottom-=100px",
        onEnter: () => timeline.play(),
        onLeaveBack: () => timeline.reverse(),
      });

      // store the timeline and trigger instances in refs
      timelineRef.current = timeline;
      triggerRef.current = trigger;
    }

    // return a cleanup function to destroy the trigger when the component unmounts
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill(); // kill the timeline instance
        timelineRef.current = null;
      }
      if (triggerRef.current) {
        triggerRef.current.kill(); // kill the trigger instance
        triggerRef.current = null;
      }
    };
  }, []);

  // useEffect(() => {
  //   if (indicatorRef.current) {
  //     const trigger = {
  //       trigger: carouselContainerRef.current,
  //       start: "top bottom",
  //       end: "bottom top",
  //       scrub: true,
  //     };

  //     const animation = {
  //       y: -indicatorRef.current.offsetHeight,
  //     };

  //     ScrollTrigger.create({
  //       trigger,
  //       animation,
  //       pin: true,
  //       pinSpacing: false,
  //       invalidateOnRefresh: true,
  //     });
  //   }
  // }, []);

  // const getWindowDimensions = () => {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height,
  //   };
  // };

  return (
    <div
      className={`${style.carouselContainer} carousel-container w-[calc(100vw-${scrollbarWidth})]`}
      ref={carouselContainerRef}
      // onClick={() => !animating && setSlide(slide + 1)}
    >
      {(isMobile ? mHeroes : heroes).map((hero, index) => (
        <Link href={`/men/${hero.link}`} key={index}>
          <div className={`${style.carouselSlide} slide w-full`}>
            <div className={`${style.outer} outer`}>
              <div className={`${style.outer} inner`}>
                <Image
                  // unoptimized
                  src={hero.image}
                  alt="hero image"
                  fill
                  className={`${style.carouselImage} carousel-image`}
                />
                <div
                  className={`absolute top-0 bottom-0 right-0 left-0 h-full w-full`}
                >
                  <div
                    className={`${style.captionContainer} caption-container`}
                  >
                    <h1 className={`caption`}>
                      {splitCaptions[index]?.map((word, index) => (
                        <div className={style.captionWord} key={index}>
                          {word?.map((char, index) => (
                            <span
                              key={index}
                              className={`${style.captionChar} caption-char`}
                            >
                              {char}
                            </span>
                          ))}
                        </div>
                      ))}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
      <div className={style.carouselIndicatorContainer} ref={indicatorRef}>
        <div className={style.carouselIndicator}>
          {heroes.map((hero, index) => (
            <div
              className={`${style.indicatorBox} ${
                currentSlide === index ? style.activeBox : style.inactiveBox
              }`}
              onClick={() => !animating && setSlide(index)}
              key={index}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCarousel;
