import Link from "next/link";

const style = {
  card: `text-sm`,
  cardInner: `py-12 px-[19%] text-center md:h-[265.6px] flex flex-col justify-between`,
  cardInnerNorm: ` bg-[#fff]`,
  cardInnerAdmin: `bg-[#212121] text-[#fff]`,
  cHeader: `mb-7 uppercase`,
  cHeaderNorm: `hover:text-[#515151]`,
  cHeaderAdmin: `hover:text-[#ddd]`,
  cText: `mb-9`,
  cLinkContainer: `mt-auto`,
  cLink: `px-[50px] py-[14px] border uppercase text-xs font-bold`,
  cLinkNorm: `hover:bg-[#212121] hover:text-[#fff] border-[#212121]`,
  cLinkAdmin: `hover:bg-[#fff] hover:text-[#212121] border-[#fff]`,
};

const ProfileCard = ({ card, admin }) => {
  return (
    <div className={style.card}>
      <div
        className={`${style.cardInner} ${
          admin ? style.cardInnerAdmin : style.cardInnerNorm
        }`}
      >
        <div>
          <h3
            className={`${style.cHeader} ${
              admin ? style.cHeaderAdmin : style.cHeaderNorm
            }`}
          >
            <Link href={card.link}>{card.header}</Link>
          </h3>
          <div className={style.cText}>{card.text}</div>
        </div>
        <div className={style.cLinkContainer}>
          <Link href={card.link}>
            <button
              className={`${style.cLink} ${
                admin ? style.cLinkAdmin : style.cLinkNorm
              }`}
            >
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
