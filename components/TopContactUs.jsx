const style = {
  bagContainer: `pt-5 bg-[#f5f5f5]`,
  helpContainer: `pb-7 text-sm`,
  helpWrapper: `flex flex-col items-end`,
  helpTitle: `mb-1 mt-6`,
  underline: `underline hover:text-[#757575]`,
};

const TopContactUs = () => {
  return (
    <div className={style.helpContainer}>
      <p className={style.helpWrapper}>
        <strong className={style.helpTitle}>Need Assistance?</strong>
        <span>
          Please contact our Customer Care team on{" "}
          <button className={style.underline}>+23480xxxxxxxx</button>
        </span>
      </p>
    </div>
  );
};

export default TopContactUs;
