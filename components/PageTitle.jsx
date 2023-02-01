const style = {
  title: `flex justify-center mb-11 uppercase font-bold text-xl mt-4 md:mt-0`,
};

const PageTitle = ({ title }) => {
  return <h1 className={style.title}>{title}</h1>;
};

export default PageTitle;
