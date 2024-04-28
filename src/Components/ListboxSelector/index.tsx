import { Listbox, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { ListBoxProps } from "./types";
import IconChevronUpDown from "../Icons/IconChevronUpDown";

function ListboxSelector({
  value,
  onChange,
  buttonTitle,
  options,
  className,
}: ListBoxProps) {
  return (
    <Listbox value={value} onChange={onChange}>
      <div className={`relative mt-1 ${className}`}>
        <Listbox.Button className="relative capitalize w-full rounded-lg border-2 border-yellow-500 hover:border-yellow-600 cursor-pointer py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-yellow-700 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate text-white">{buttonTitle}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IconChevronUpDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? "bg-slate-700 text-white" : "text-white"
                  }`
                }
                value={option.value}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? "font-medium" : "font-normal"
                    }`}
                  >
                    {option.label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default ListboxSelector;
