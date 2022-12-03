import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const heroes = [
  {
    image: "/heroImages/hero1.jpg",
    link: "/",
    caption: "Timeless Bags for Men",
  },
  { image: "/heroImages/hero2.jpg", link: "/", caption: "Horsebit Mini Bags" },
  { image: "/heroImages/hero3.jpg", link: "/", caption: "GG Belts" },
  { image: "/heroImages/hero4.jpg", link: "/", caption: "Supreme Flora" },
];

const style = {
  carouselContainer: `w-full md:h-[608px] 2xl:h-[730px] relative overflow-hidden`,
  carouselSlide: `absolute top-0 invisible`,
  outer: `w-full h-full overflow-y-hidden`,
  carouselImage: `max-w-full max-h-full`,
  //   captionContainer: `sticky top-0 left-0 text-[#fff] text-[4rem] max-w-[550px] uppercase font-['Cormorant-Garamond']`,
  captionContainer: `absolute bottom-10 left-10 text-[#fff] text-[4rem] max-w-[550px] uppercase font-['Cormorant-Garamond']`,
  captionWord: `inline-block mr-4`,
  captionChar: `inline-block mr-1`,
  carouselIndicatorContainer: `absolute bottom-0 left-0 right-0 flex z-10`,
  carouselIndicator: `flex mx-auto mb-3 items-center`,
  indicatorBox: `m-[5px] cursor-pointer`,
  inactiveBox: `h-1 w-1 bg-[#fff]`,
  activeBox: `h-3 w-3 border border-[#fff]`,
};

const MainCarousel = ({ homeRef }) => {
  const [slide, setSlide] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [splitCaptions, setSplitCaptions] = useState([]);
  const [animating, setAnimating] = useState(false);
  const slideRef = useRef();
  const carouselContainerRef = useRef();
  const captionContainerRef = useRef();

  const indicatorRef = useRef();

  useEffect(() => {
    const context = homeRef.current;

    const carouselContainer = context.querySelector(".carousel-container");
    const captionContainer = context.querySelectorAll(".caption-container");
    const indicator = context.querySelectorAll(".carousel-container");

    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      // gsap.set(indicatorRef, { yPercent: -100 });
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: homeRef.current,
            scrub: true,
            pin: true,
            markers: true,
            start: "top 88",
            end: "+=200%",
          },
        })
        .from(
          carouselContainer,
          {
            scale: 1.5,
            top: 88,
            ease: "none",
          },
          "scroll"
        )
        .from(
          captionContainer,
          {
            bottom: 100,
            left: 180,
          },
          "scroll"
        );
      // .from(
      //   indicatorRef.current,
      //   {
      //     ScrollTrigger: {
      //       trigger: carouselContainer[slide],
      //       end: "bottom bottom",
      //       pin: true,
      //       markers: true,
      //     },
      //   },
      //   "scroll"
      // );

      //   ScrollTrigger.create({
      //     trigger: ".screen-overlay",
      //     start: "bottom bottom-=100px",
      //     markers: true,
      //     onEnter: () => {
      //       gsap.set(carouselContainer, { position: "absolute" });
      //     },
      //     onLeaveBack: () => {
      //       gsap.set(carouselContainer, { position: "fixed" });
      //     },
      //   });
    }, context);

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    let captions = [];
    let wordArr = [];

    const pushCaptions = () => {
      heroes.map((hero) => {
        // let newText = `Shop ${hero.caption}`;
        captions.push(hero.caption);
      });
      captions.map((caption) => {
        wordArr.push(caption.split(" "));
      });
      wordArr.map((caption, i) => {
        caption.map((word, j) => {
          wordArr[i][j] = word.split("");
        });
      });
    };
    pushCaptions();

    setSplitCaptions(wordArr);
  }, []);

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
        console.log(slideIndex, currentSlide, slide);
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

  return (
    <div
      className={`${style.carouselContainer} carousel-container`}
      ref={carouselContainerRef}
      // onClick={() => !animating && setSlide(slide + 1)}
    >
      <div className="fixed w-screen h-screen z-0 screen-overlay"></div>
      {heroes.map((hero, index) => (
        <Link href={hero.link} key={index}>
          <div className={`${style.carouselSlide} slide`}>
            <div className={`${style.outer} outer`}>
              <div className={`${style.outer} inner`}>
                <img
                  src={hero.image}
                  alt="hero image"
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
