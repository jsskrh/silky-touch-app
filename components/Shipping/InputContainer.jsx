import InputLabel from "./InputLabel";

const style = {
  inputContainer: `mb-6 w-1/2`,
  errorMessage: `mt-1 text-[#bf2d2d]`,
};

const InputContainer = ({ children, id, label, error }) => {
  return (
    <div className={style.inputContainer}>
      <InputLabel id={id} text={label} required />
      {children}
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputContainer;
