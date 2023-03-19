import Link from "next/link";

const style = {
  ebContainer: `mb-4 flex flex-col items-center`,
  ebTitle: `mb-2 font-bold text-lg`,
  ebText: `mb-2 text-sm`,
  buttonLink: `w-full md:w-auto`,
  // cShoppingContainer: `md:mr-4`,
  cShopping: `hover:bg-[#212121] hover:text-[#fafafa] border border-[#212121] px-[30px] py-[13px] text-xs font-bold uppercase w-full`,
};

const Empty = ({ title, text }) => {
  return (
    <div className={style.ebContainer}>
      <h2 className={style.ebTitle}>{title}</h2>
      <p className={style.ebText}>{text}</p>
      <Link href="/" className={style.buttonLink}>
        <div className={style.cShoppingContainer}>
          <button className={style.cShopping}>Continue Shopping</button>
        </div>
      </Link>
    </div>
  );
};

export default Empty;
