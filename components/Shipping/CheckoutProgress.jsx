const style = {
  checkoutProgress: `md:h-28 flex items-center`,
  progressList: `flex`,
  progressStep: `py-3 mr-7 uppercase text-lg`,
  activeStep: `font-bold underline`,
};

const CheckoutProgress = ({ activeStep = 0 }) => {
  return (
    <div className={style.checkoutProgress}>
      <ol className={style.progressList}>
        {["Login", "Shipping", "Billing", "Confirmation"].map((step, index) => (
          <li
            key={index}
            className={`${style.progressStep} ${
              index === activeStep && style.activeStep
            }`}
          >
            {index !== 0 && <span>{index}. </span>}
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CheckoutProgress;
