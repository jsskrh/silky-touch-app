import { useEffect, useState } from "react";
import Slide from "./Slide";

const style = {
  content: `flex ease-out h-full`,
  transition: ` transition-transform duration-[1500ms] delay-700`,
  returnTransition: ` transition-transform duration-[1500ms]`,
};

const SliderContent = ({
  images,
  name,
  width,
  transition,
  setTransition,
  productPage,
}) => {
  const [transitioning, setTransitioning] = useState(false);
  const [inTransition, setInTransition] = useState(false);
  const [leave, setLeave] = useState(false);
  const [slides, setSlides] = useState([...images, images[0]]);

  const handleSlide = () => {
    setLeave(false);
    if (!inTransition) {
      setInTransition(true);
      setTransition(transition + 1);
    }
  };

  const handleTransitionEnd = () => {
    setInTransition(false);
    if (!productPage && transition === 3) {
      setInTransition(true);
      setTransition(0);
      setTimeout(() => {
        setInTransition(false);
      }, 20);
    }
  };

  const handleMouseLeave = () => {
    setLeave(true);
    setTransition(0);
    setInTransition(false);
    setTransitioning(false);
  };

  useEffect(() => {
    if (transitioning) {
      handleSlide();
    }
  });

  return (
    <div
      className={`${style.content} ${transition !== 0 && style.transition} ${
        leave && style.returnTransition
      }`}
      style={{ transform: `translateX(${-width * transition}px)` }}
      onMouseOver={() => {
        !productPage && setTransitioning(true);
      }}
      onMouseLeave={() => {
        !productPage && handleMouseLeave();
      }}
      onTransitionEnd={() => handleTransitionEnd()}
    >
      {slides.map((image, index) => (
        <Slide image={image} name={name} key={index} />
      ))}
    </div>
  );
};

export default SliderContent;
