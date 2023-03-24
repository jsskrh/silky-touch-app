import InputLabel from "./InputLabel";

const style = {
  inputContainer: `mb-6`,
  halfWidth: `md:w-1/2`,
  errorMessage: `mt-1 text-[#bf2d2d]`,
};

const InputContainer = ({ children, id, label, error, fullWidth }) => {
  return (
    <div className={`${style.inputContainer} ${!fullWidth && style.halfWidth}`}>
      <InputLabel id={id} text={label} required />
      {children}
      {error && <div className={style.errorMessage}>{error}</div>}
    </div>
  );
};

export default InputContainer;
