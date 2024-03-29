import { useEffect, useRef, useState } from "react";
import { Indicator, ProductPageIndicator } from "./Indicator";
import SliderContent from "./SliderContent";

const style = {
  slider: `overflow-hidden relative group h-full`,
};

const Slider = ({ images, name, slider, productPage }) => {
  const [transition, setTransition] = useState(0);
  const [width, setWidth] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setWidth(sliderRef.current.offsetWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imagesArr = images.map((image) => {
    return image.url;
  });

  return (
    <div className={style.slider} ref={sliderRef}>
      <SliderContent
        images={productPage ? imagesArr : imagesArr.slice(0, 3)}
        name={name}
        width={width}
        transition={slider ? false : transition}
        setTransition={setTransition}
        productPage={productPage}
      />
      {productPage ? (
        <ProductPageIndicator
          imagesArr={imagesArr}
          setTransition={setTransition}
          transition={transition}
        />
      ) : (
        <Indicator transition={slider ? false : transition} />
      )}
    </div>
  );
};

export default Slider;
