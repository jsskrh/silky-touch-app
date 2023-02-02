import Link from "next/link";

const style = {
  ebContainer: `mb-4 flex flex-col items-center`,
  ebTitle: `mb-2 font-bold text-lg`,
  ebText: `mb-2 text-sm`,
  buttonLink: `w-full md:w-auto`,
  // cShoppingContainer: `md:mr-4`,
  cShopping: `hover:bg-[#212121] hover:text-[#fafafa] border border-[#212121] px-[30px] py-[13px] text-xs font-bold uppercase w-full`,
};

const BagEmpty = () => {
  return (
    <div className={style.ebContainer}>
      <h2 className={style.ebTitle}>Bag Empty.</h2>
      <p className={style.ebText}>You have 0 items in your bag</p>
      <Link href="/" className={style.buttonLink}>
        <div className={style.cShoppingContainer}>
          <button className={style.cShopping}>Continue Shopping</button>
        </div>
      </Link>
    </div>
  );
};

export default BagEmpty;
