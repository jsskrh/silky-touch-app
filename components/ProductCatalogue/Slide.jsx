import { useRef } from "react";
import Image from "next/image";
// import ColorThief from "colorthief/dist/color-thief.mjs";

const style = { productImage: `self-center` };

const Slide = ({ image, name }) => {
  const imgRef = useRef();

  // const colorThief = new ColorThief();
  // const img = imgRef.current;

  // if (img.complete) {
  //   colorThief.getColor(img);
  // } else {
  //   image.addEventListener("load", function () {
  //     colorThief.getColor(img);
  //   });
  // }

  // var img = _(".thumbnail img"),
  //   canvas = _("#cs"),
  //   result = _(".result"),
  //   preview = _(".preview"),
  //   x = "",
  //   y = "";
  // img.addEventListener(
  //   "click",
  //   function (e) {
  //     if (e.offsetX) {
  //       x = e.offsetX;
  //       y = e.offsetY;
  //     } else if (e.layerX) {
  //       x = e.layerX;
  //       y = e.layerY;
  //     }
  //     useCanvas(canvas, img, function () {
  //       var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
  //       result.innerHTML =
  //         "<span>HEX: " +
  //         rgbToHex(p[0], p[1], p[2]) +
  //         "</span>" +
  //         "<span>RGB:  rgb(" +
  //         p[0] +
  //         "," +
  //         p[1] +
  //         "," +
  //         p[2] +
  //         ")</span>";

  //       document.body.style.background = rgbToHex(p[0], p[1], p[2]);
  //     });
  //   },
  //   false
  // );
  // img.addEventListener(
  //   "mousemove",
  //   function (e) {
  //     if (e.offsetX) {
  //       x = e.offsetX;
  //       y = e.offsetY;
  //     } else if (e.layerX) {
  //       x = e.layerX;
  //       y = e.layerY;
  //     }

  //     useCanvas(canvas, img, function () {
  //       var p = canvas.getContext("2d").getImageData(x, y, 1, 1).data;
  //       preview.style.background = rgbToHex(p[0], p[1], p[2]);
  //     });
  //   },
  //   false
  // );
  // function useCanvas(el, image, callback) {
  //   el.width = image.width;
  //   el.height = image.height;
  //   el.getContext("2d").drawImage(image, 0, 0, image.width, image.height);
  //   return callback();
  // }
  // function _(el) {
  //   return document.querySelector(el);
  // }
  // function componentToHex(c) {
  //   var hex = c.toString(16);
  //   return hex.length == 1 ? "0" + hex : hex;
  // }
  // function rgbToHex(r, g, b) {
  //   return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  // }
  // function findPos(obj) {
  //   var curleft = 0,
  //     curtop = 0;
  //   if (obj.offsetParent) {
  //     do {
  //       curleft += obj.offsetLeft;
  //       curtop += obj.offsetTop;
  //     } while ((obj = obj.offsetParent));
  //     return { x: curleft, y: curtop };
  //   }
  //   return undefined;
  // }

  return (
    // <div>
    // <Image
    //   src={image}
    //   alt={name}
    //   className={`${style.productImage} original-height`}
    //   style={{
    //     width: "100%",
    //     height: "auto",
    //   }}
    //   ref={imgRef}
    //   placeholder="blur"
    // />
    <img
      src={image}
      alt={name}
      className={`${style.productImage} original-height`}
      ref={imgRef}
    />
    // </div>
  );
};

export default Slide;
