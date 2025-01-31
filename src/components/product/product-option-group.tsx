'use client';

import { cn } from '@/lib/cn';
import { ProductOtherOption, ProductVerifiedOption } from '@/types/product';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface OptionGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  groupOption: ProductVerifiedOption;
  groupValue: string;
  updateOption: (name: string, value: string) => void;
}

const OptionGroup = ({
  groupOption,
  groupValue,
  updateOption,
  className,
  ...props
}: OptionGroupProps) => {
  switch (groupOption.type) {
    case 'color': {
      return (
        <div className="flex flex-col space-y-2">
          <OptionGroupLabel groupOption={groupOption} groupValue={groupValue} />
          <div
            role="radiogroup"
            className={cn('flex flex-wrap gap-2', className)}
            {...props}
          >
            {groupOption.optionValues.map((optionValue) => (
              <OptionGroupColorItem
                key={optionValue.name}
                groupName={groupOption.name}
                groupValue={groupValue}
                value={optionValue.name}
                color={optionValue.swatch.color}
                onChange={updateOption}
              />
            ))}
          </div>
        </div>
      );
    }
    case 'size': {
      return (
        <div className="flex flex-col space-y-2">
          <OptionGroupLabel groupOption={groupOption} groupValue={groupValue} />
          <div
            role="radiogroup"
            className={cn('flex flex-wrap gap-2', className)}
            {...props}
          >
            {groupOption.optionValues.map((optionValue) => (
              <OptionGroupSizeItem
                key={optionValue.name}
                groupName={groupOption.name}
                groupValue={groupValue}
                value={optionValue.name}
                onChange={updateOption}
              />
            ))}
          </div>
        </div>
      );
    }
    case 'select': {
      return (
        <div className="flex flex-col space-y-2">
          <OptionGroupLabel groupOption={groupOption} groupValue={groupValue} />
          <OptionGroupSelectItem
            groupOption={groupOption}
            groupValue={groupValue}
            onChange={updateOption}
          />
        </div>
      );
    }
    default:
      return null;
  }
};
OptionGroup.displayName = 'OptionGroup';

const OptionGroupLabel = ({
  groupOption,
  groupValue,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  groupOption: ProductVerifiedOption;
  groupValue: string;
}) => {
  return (
    <span className={cn('uppercase', className)} {...props}>
      {groupOption.name} : {groupValue}
    </span>
  );
};
OptionGroupLabel.displayName = 'ProductOptionLabel';

const OptionGroupItemInput = ({
  name,
  value,
  onChange,
}: {
  name: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) => {
  return (
    <input
      id={`${name}_${value}`}
      type="radio"
      name={name}
      value={value}
      onChange={() => onChange(name, value)}
      className="peer absolute appearance-none"
    />
  );
};
OptionGroupItemInput.displayName = 'OptionGroupItemInput';

const OptionGroupColorItem = ({
  groupName,
  groupValue,
  value,
  color,
  onChange,
}: {
  groupName: string;
  groupValue: string;
  value: string;
  color: string;
  onChange: (name: string, value: string) => void;
}) => (
  <div>
    <OptionGroupItemInput name={groupName} value={value} onChange={onChange} />
    <label
      htmlFor={`${groupName}_${value}`}
      className={cn(
        'flex min-h-8 min-w-14 items-center justify-center border border-black p-1 font-medium ring ring-transparent transition-colors peer-focus:ring-black hover:ring-black',
        groupValue === value && 'ring-black',
      )}
    >
      <span
        className="h-full w-full text-transparent"
        style={{
          backgroundColor: color,
        }}
      >
        {value}
      </span>
    </label>
  </div>
);
OptionGroupColorItem.displayName = 'OptionGroupColorItem';

const OptionGroupSizeItem = ({
  groupName,
  groupValue,
  value,
  onChange,
}: {
  groupName: string;
  groupValue: string;
  value: string;
  onChange: (name: string, value: string) => void;
}) => {
  return (
    <div>
      <OptionGroupItemInput
        name={groupName}
        value={value}
        onChange={onChange}
      />
      <label
        htmlFor={`${groupName}_${value}`}
        className={cn(
          'flex min-h-8 min-w-14 items-center justify-center border border-black font-medium ring ring-transparent transition-colors peer-focus:ring-black hover:ring-black',
          groupValue === value && 'bg-black text-white',
        )}
      >
        {value}
      </label>
    </div>
  );
};
OptionGroupSizeItem.displayName = 'OptionGroupSizeItem';

const OptionGroupSelectItem = ({
  groupOption,
  groupValue,
  onChange,
}: {
  groupOption: ProductOtherOption;
  groupValue: string;
  onChange: (name: string, value: string) => void;
}) => {
  return (
    <Select
      name={groupOption.name}
      value={groupValue}
      onValueChange={(v) => onChange(groupOption.name, v)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {groupOption.optionValues.map((optionValue) => (
            <SelectItem key={optionValue.name} value={optionValue.name}>
              {optionValue.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
OptionGroupSelectItem.displayName = 'OptionGroupSelectItem';

export { OptionGroup };
