import { RadioGroup } from "@headlessui/react";
import { classNames } from "../utilities/helpers";

export type Option = {
  name: string;
  value: any;
};

interface Props {
  label?: string;
  options?: Option[];
  selectedValue: any;
  onChange: (value: any) => void;
}

const RadioGroupComponent: React.FC<Props> = ({
  label = "",
  options = [],
  selectedValue,
  onChange,
}) => {
  return (
    <div className='w-full'>
      <div
        className={classNames(
          " items-center justify-between",
          !!label ? "flex" : "hidden"
        )}>
        <h2 className=' font-medium leading-6 text-gray-900  md:text-sm sm:text-base mt-3'>
          {label}
        </h2>
      </div>

      <RadioGroup value={selectedValue} onChange={onChange} className='mt-2'>
        <RadioGroup.Label
          className={classNames("sr-only", !!label ? "flex" : "hidden")}>
          {label}
        </RadioGroup.Label>
        <div className='grid grid-cols-2 sm:grid-cols-2 gap-1 md:gap-3'>
          {options.map((option) => (
            <RadioGroup.Option
              key={option.name}
              value={option.value}
              className={({ active, checked }) =>
                classNames(
                  "cursor-pointer",
                  active ? "ring-2 ring-indigo-600 ring-offset-2" : "",
                  checked
                    ? "bg-indigo-600 text-white hover:bg-indigo-500"
                    : "ring-1 ring-inset ring-gray-300 bg-white text-gray-900 hover:bg-gray-50",
                  "flex items-center justify-center rounded-md p-3 font-semibold uppercase sm:flex-1 text-xs md:text-sm "
                )
              }>
              <RadioGroup.Label as='span'>{option.name}</RadioGroup.Label>
            </RadioGroup.Option>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};
export default RadioGroupComponent;
