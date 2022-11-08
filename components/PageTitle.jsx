const style = {
  title: `flex justify-center mb-11 uppercase font-bold text-xl`,
};

const PageTitle = ({ title }) => {
  return <h1 className={style.title}>{title}</h1>;
};

export default PageTitle;
