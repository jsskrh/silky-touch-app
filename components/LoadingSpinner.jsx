const style = {
  spinner: `inline-block animate-spin rounded-full border-solid border-current border-r-transparent align-[-0.125em]`,
  sm: `h-4 w-4 border-2`,
  base: `h-6 w-6 border-4`,
  loadingText: `ml-2`,
};

const LoadingSpinner = ({ size }) => {
  return (
    <>
      <div className={`${style.spinner} ${style.sm}`}></div>
    </>
  );
};

export default LoadingSpinner;
