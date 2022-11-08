import { useEffect, useRef, useState } from "react";
import Indicator from "./Indicator";
import SliderContent from "./SliderContent";

const style = { slider: `overflow-hidden relative group` };

const Slider = ({ images, name }) => {
  const [transition, setTransition] = useState(0);
  const [width, setWidth] = useState(0);

  const sliderRef = useRef(null);

  useEffect(() => {
    setWidth(sliderRef.current.offsetWidth);
  }, []);

  let imageArr = [];
  images.slice(0, 3).forEach((image) => {
    imageArr.push(Object.values(image));
  });

  return (
    <div className={style.slider} ref={sliderRef}>
      <SliderContent
        images={imageArr}
        name={name}
        width={width}
        transition={transition}
        setTransition={setTransition}
      />
      <Indicator transition={transition} />
    </div>
  );
};

export default Slider;
