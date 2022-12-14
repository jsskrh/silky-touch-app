import { Disclosure, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const style = {
  tabGroup: `border-b botder-[#c0c0c0] text-sm`,
  groupHead: `flex justify-between py-4 items-center w-full`,
  groupTitle: `font-bold`,
  heroIcon: `h-7 w-7`,
  transform: `transform rotate-180`,
  tabContent: `pb-4`,
};

const TabLayout = ({ children, title, setTabState, tabState }) => {
  return (
    <Disclosure as="div" className={style.tabGroup}>
      {({ open }) => (
        <>
          <Disclosure.Button
            className={style.groupHead}
            onClick={() => {
              setTimeout(() => {
                setTabState(tabState + 1);
              }, 250);
            }}
          >
            <h3 className={style.groupTitle}>{title}</h3>
            <span>
              <ChevronDownIcon
                className={`${style.heroIcon} ${open && style.transform}`}
              ></ChevronDownIcon>
            </span>
          </Disclosure.Button>
          <Transition
            enter={`transition-all duration-200 ease-in transform`}
            enterFrom={`h-0 scale-95 opacity-50`}
            enterTo={`h-full scale-100 opacity-100`}
            leave={`transition-all duration-200 ease-out`}
            leaveFrom={`h-full scale-100 opacity-100`}
            leaveTo={`h-0 scale-95 opacity-50`}
          >
            <Disclosure.Panel className={style.tabContent}>
              {children}
            </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
  );
};

export default TabLayout;
