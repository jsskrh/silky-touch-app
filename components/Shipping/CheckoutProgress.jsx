import Link from "next/link";

const progress = ["login", "shipping", "payment", "confirmation"];

const style = {
  checkoutProgress: `md:h-28 flex items-center justify-center md:justify-start`,
  progressList: `flex`,
  progressStep: `py-3 mr-4 md:mr-7 text-sm md:text-lg capitalize whitespace-nowrap`,
  activeStep: `font-bold underline`,
  disabledLink: `pointer-events-none`,
};

const CheckoutProgress = ({ activeStep = 0 }) => {
  return (
    <div className={style.checkoutProgress}>
      <ol className={style.progressList}>
        {progress.map((step, index) => (
          <li
            key={index}
            className={`${style.progressStep} ${
              index === activeStep && style.activeStep
            }`}
          >
            <Link
              className={`${
                index === 0 || (index >= activeStep && style.disabledLink)
              }`}
              href={`/${progress[index]}`}
            >
              {index !== 0 && <span>{index}. </span>}
              {step}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default CheckoutProgress;
