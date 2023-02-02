const style = {
  indicator: `absolute bottom-0 h-[5px] w-full bg-[#e0e0e0] transition-opacity ease-in-out duration-1000 opacity-0 group-hover:opacity-100`,
  indicatorDots: `flex h-full`,
  indicatorDot: `flex-1 transition-all duration-[300ms] delay-500 ease-in-out`,
  active: `bg-[#757575]`,
  ppIndicatorContainer: `absolute bottom-5 left-5 flex`,
  ppIndicator: `bg-[#757575] cursor-pointer h-[5px] w-[5px] rounded-full mr-3`,
  ppActive: `bg-[#c0c0c0]`,
};

const Indicator = ({ transition }) => {
  return (
    <div className={style.indicator}>
      <div className={style.indicatorDots}>
        <div
          className={`${style.indicatorDot} ${
            (transition === 0 || transition === 3) && style.active
          }`}
        ></div>
        <div
          className={`${style.indicatorDot} ${
            transition === 1 && style.active
          }`}
        ></div>
        <div
          className={`${style.indicatorDot} ${
            transition === 2 && style.active
          }`}
        ></div>
      </div>
    </div>
  );
};

const ProductPageIndicator = ({ imagesArr, setTransition, transition }) => {
  return (
    <div className={style.ppIndicatorContainer}>
      {imagesArr.map((image, index) => (
        <div
          key={index}
          onClick={() => setTransition(index)}
          className={`${style.ppIndicator} ${
            transition === index && style.ppActive
          }`}
        ></div>
      ))}
    </div>
  );
};

export { Indicator, ProductPageIndicator };
