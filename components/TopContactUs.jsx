const style = {
  helpContainer: `pb-7 text-sm`,
  helpWrapper: `flex flex-col items-end`,
  center: `items-center`,
  helpTitle: `mb-1 mt-6`,
  underline: `text-[#212121] hover:text-[#757575] relative after:bg-[#212121] hover:after:bg-[#757575] after:absolute after:content-[''] after:w-full after:bottom-[-1px] after:h-[1px] after:left-0 after:right-0`,
};

const TopContactUs = ({ isMobile }) => {
  return (
    <div className={style.helpContainer}>
      <p className={`${style.helpWrapper} ${isMobile && style.center}`}>
        <strong className={style.helpTitle}>Need Assistance?</strong>
        <span className={`${isMobile && "text-center"}`}>
          Please contact our Customer Care team on{" "}
          <button className={style.underline}>+23480xxxxxxxx</button>
        </span>
      </p>
    </div>
  );
};

export default TopContactUs;
