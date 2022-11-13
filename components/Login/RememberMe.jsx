import CheckboxLayout from "../CheckboxLayout";

const style = {
  checkboxContainer: `mb-9`,
};

const RememberMe = () => {
  return (
    <div className={style.checkboxContainer}>
      <CheckboxLayout id="rememberMe">Remember me</CheckboxLayout>
    </div>
  );
};

export default RememberMe;
