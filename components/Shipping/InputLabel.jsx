const style = { label: `mb-[5px]` };

const InputLabel = ({ id, text, required }) => {
  return (
    <label className={style.label} htmlFor={id}>
      {text} {required && "*"}
    </label>
  );
};

export default InputLabel;
