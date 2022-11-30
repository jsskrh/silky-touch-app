const style = {
  indicator: `absolute bottom-0 h-[5px] w-full bg-[#e0e0e0] transition-opacity ease-in-out duration-1000 opacity-0 group-hover:opacity-100`,
  indicatorDots: `flex h-full`,
  indicatorDot: `flex-1 transition-all duration-[300ms] delay-500 ease-in-out`,
  active: ` bg-[#757575]`,
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

export default Indicator;
