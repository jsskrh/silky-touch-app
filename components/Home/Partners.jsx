import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
// import dynamic from "next/dynamic";

// // const ASScroll = dynamic(() => import("@ashthornton/asscroll"), { ssr: false });

// const isTouch = typeof window !== "undefined" && "ontouchstart" in window;

const partners = [
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1689930697/partners/w8rphvhvxh7lpgkqhejg.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1689930697/partners/bhb9bsv88e6dygnwcvab.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1689930697/partners/fnugk4xk3bnh0pbxwhoy.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1689930697/partners/srt08sskb9oimt2q84nd.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1689930697/partners/nqij4mxyqdqfunrrlgle.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1689930697/partners/ujuv9legphusk8crbvjf.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1690008157/partners/t7lzkfexdi6r3dptyzan.jpg",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1692462912/partners/gfcgiihf4aed2tamlbbp.png",
  "https://res.cloudinary.com/dixuzyoht/image/upload/v1709020157/partners/iuxyh6eubbqsjyubm4jz.png",
];

const style = {
  sectionContainer: `py-10 mb-20`,
  brandGrid: `grid md:grid-cols-2 md:gap-5 mb-10`,
  imageContainer: `w-full max-h-[630px] overflow-hidden`,
  image: `max-w-full`,
  brandDetails: `text-center`,
  title: `text-4xl uppercase text-center mb-10`,
  partnerContainer: `grid grid-cols-1 md:grid-cols-3 gap-4 items-center mx-10`,
  button: `transition-all border px-[30px] py-[13px] w-52 text-xs font-bold uppercase mt-4 bg-[#212121] border-[#212121] text-[#ededed] hover:bg-[#000] hover:border-[#000] hover:text-[#fff]`,
};

const Partners = () => {
  //   useEffect(() => {
  //     const initializeScroll = async () => {
  //       //   const ASScrollClass = await import("@ashthornton/asscroll");
  //       const ASScroll = require("@ashthornton/asscroll");
  //       const asscroll = new ASScroll({
  //         disableRaf: true,
  //       });

  //       gsap.ticker.add(asscroll.update);

  //       ScrollTrigger.defaults({
  //         scroller: asscroll.containerElement,
  //       });

  //       ScrollTrigger.scrollerProxy(asscroll.containerElement, {
  //         scrollTop(value) {
  //           return arguments.length
  //             ? (asscroll.currentPos = value)
  //             : asscroll.currentPos;
  //         },
  //         getBoundingClientRect() {
  //           return {
  //             top: 0,
  //             left: 0,
  //             width: window.innerWidth,
  //             height: window.innerHeight,
  //           };
  //         },
  //       });

  //       asscroll.on("update", ScrollTrigger.update);
  //       ScrollTrigger.addEventListener("refresh", asscroll.resize);

  //       const totalScroll =
  //         asscroll.containerElement.scrollHeight - window.innerHeight;

  //       gsap.to(".peach", {
  //         scrollTrigger: {
  //           pin: true,
  //           pinType: isTouch ? "fixed" : "transform",
  //           end: "200%",
  //           scrub: 0.2,
  //           trigger: ".peaches",
  //         },
  //         y: (i, target) => -totalScroll * parseFloat(target.dataset.speed),
  //         ease: "none",
  //       });

  //       gsap.from(".gif img", {
  //         scrollTrigger: {
  //           pin: true,
  //           pinType: isTouch ? "fixed" : "transform",
  //           scrub: true,
  //           trigger: ".gif",
  //         },
  //         scale: 0.2,
  //         autoAlpha: 0,
  //         ease: "sine.out",
  //       });

  //       asscroll.enable();
  //     };

  //     initializeScroll();
  //   }, []);

  return (
    <div>
      <h3 className={style.title}>Our Partners</h3>
      <div className={style.partnerContainer}>
        {/* {partners.map((partner, index) => (
          <div className="justify-center flex h-24 md:h-40">
            <img src={partner} key={index} className="max-h-full max-w-full" />
          </div>
        ))} */}
        <div className="justify-center flex h-36 md:h-40">
          <img src={partners[0]} className="max-h-full max-w-full" />
        </div>
        <div className="justify-center flex h-24 md:h-40">
          <img src={partners[1]} className="max-h-full max-w-full" />
        </div>
        <div className="justify-center flex h-36 md:h-40">
          <img src={partners[2]} className="max-h-full max-w-full" />
        </div>
        <div className="justify-center flex h-24 md:h-40">
          <img src={partners[3]} className="max-h-full max-w-full" />
        </div>
        <div className="flex justify-center py-10">
          <div className="justify-center flex h-20 md:h-32">
            <img src={partners[4]} className="max-h-full max-w-full" />
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="justify-center flex max-sm:w-40 md:w-60">
            <img src={partners[5]} className="max-h-full max-w-full" />
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="justify-center flex max-sm:w-40 md:w-60">
            <img src={partners[6]} className="max-h-full max-w-full" />
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="justify-center flex max-sm:w-40 md:w-60">
            <img src={partners[7]} className="max-h-full max-w-full" />
          </div>
        </div>
        <div className="flex justify-center py-10">
          <div className="justify-center flex max-sm:w-40 md:w-60">
            <img src={partners[8]} className="max-h-full max-w-full" />
          </div>
        </div>
      </div>
    </div>
    // <div>
    //   <div asscroll>
    //     <div className="peaches">
    //       <div className="peach" data-speed="0.3">
    //         🍑
    //       </div>
    //       <div className="peach" data-speed="0.37">
    //         🍑
    //       </div>
    //       <div className="peach" data-speed="0.35">
    //         🍑
    //       </div>
    //       <div className="peach" data-speed="0.4">
    //         🍑
    //       </div>
    //       <div className="peach" data-speed="0.2">
    //         🍑
    //       </div>
    //       <div className="peach" data-speed="0.3">
    //         🍑
    //       </div>
    //       <div className="peach" data-speed="0.45">
    //         🍑
    //       </div>
    //     </div>
    //     <div className="text" data-speed="0.2">
    //       <span>
    //         <a href="https://github.com/ashthornton/asscroll" target="_blank">
    //           ASScroll
    //         </a>{" "}
    //         <span>&times;</span> GSAP ScrollTrigger
    //       </span>
    //     </div>
    //     <div className="gif">
    //       <img
    //         src="https://media.giphy.com/media/BoBOKNtlR8rTi/giphy.gif"
    //         alt=""
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default Partners;
