import { RadioGroup } from "@headlessui/react";
import React from "react";

const style = {
  paymentMethod: `py-6 border-b border-[#e6e6e6] text-[#515151] text-sm`,
  paymentMethodInner: `cursor-pointer flex items-center`,
  radio: `h-[18px] w-[18px] border border-[#515151] flex justify-center items-center rounded-full`,
  radioCheck: `h-[6px] w-[6px] bg-[#515151] rounded-full`,
  label: `ml-1`,
};

const paymentMethods = ["Paystack"];
// const paymentMethods = ["Paystack", "Stripe", "Paypal"];

const PaymentRadioGroup = React.forwardRef((props, ref) => {
  return (
    <RadioGroup value={props.value} onChange={props.onChange}>
      {paymentMethods.map((method) => (
        <RadioGroup.Option value={method} key={method}>
          {({ checked }) => (
            <div className={style.paymentMethod}>
              <div className={style.paymentMethodInner}>
                <div className={style.radio}>
                  <div className={checked ? style.radioCheck : ""}></div>
                </div>
                <span className={style.label}>{method}</span>
              </div>
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
});

export default PaymentRadioGroup;
