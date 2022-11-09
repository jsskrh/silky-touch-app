import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const style = {
  tabGroup: `border-b botder-[#c0c0c0] text-sm`,
  groupHead: `flex justify-between py-4 items-center w-full`,
  groupTitle: `font-bold`,
  heroIcon: `h-7 w-7`,
  transform: `transform rotate-180`,
  tabContent: `pb-4`,
};

const TabLayout = ({ children, title }) => {
  return (
    <Disclosure as="div" className={style.tabGroup}>
      {({ open }) => (
        <>
          <Disclosure.Button className={style.groupHead}>
            <h3 className={style.groupTitle}>{title}</h3>
            <span>
              <ChevronDownIcon
                className={`${style.heroIcon} ${open && style.transform}`}
              ></ChevronDownIcon>
            </span>
          </Disclosure.Button>
          <Disclosure.Panel className={style.tabContent}>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default TabLayout;
