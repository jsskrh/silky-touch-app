import Link from "next/link";

const style = {
  card: `text-sm`,
  cardInner: `py-12 px-[19%] text-center bg-[#fff]`,
  cHeader: `mb-7 uppercase hover:text-[#515151] inline-block`,
  cText: `mb-9`,
  cLink: `px-[50px] py-[14px] border border-[#212121] uppercase text-xs font-bold hover:bg-[#212121] hover:text-[#fff]`,
};

const ProfileCard = ({ card }) => {
  return (
    <div className={style.card}>
      <div className={style.cardInner}>
        <h3 className={style.cHeader}>
          <Link href={card.link}>{card.header}</Link>
        </h3>
        <div className={style.cText}>{card.text}</div>
        <div className={style.cLinkContainer}>
          <Link href={card.link}>
            <button className={style.cLink}>View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
