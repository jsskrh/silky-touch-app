const style = {
  queryBar: `px-6 font-bold text-xs border-y border-[#bdbdbd] sticky top-[68px] md:top-[88px] z-10 bg-white`,
  queryBarInner: `py-6 flex justify-between`,
};

const QueryBar = ({ productNo }) => {
  return (
    <div className={style.queryBar}>
      <div className={style.queryBarInner}>
        <span>Show Filters</span>
        <span>{productNo} Products</span>
        <span>Sort By</span>
      </div>
    </div>
  );
};

export default QueryBar;
