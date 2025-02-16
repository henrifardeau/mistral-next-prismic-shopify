'use client';

import * as React from 'react';

import { cn } from '@/lib/cn';

interface RadioGroupContextProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = React.createContext<
  RadioGroupContextProps | undefined
>(undefined);

const useRadioGroup = () => {
  const context = React.useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error('useRadioGroup must be used within a RadioGroupProvider');
  }

  return context;
};

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = ({
  className,
  value,
  onValueChange,
  ...props
}: RadioGroupProps) => {
  const id = React.useId();

  return (
    <RadioGroupContext.Provider value={{ id, value, onValueChange }}>
      <div
        role="radiogroup"
        className={cn('flex flex-wrap gap-2', className)}
        {...props}
      />
    </RadioGroupContext.Provider>
  );
};
RadioGroup.displayName = 'RadioGroup';

interface RadioGroupItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const RadioGroupItem = ({ value, children, ...props }: RadioGroupItemProps) => {
  const radioGroup = useRadioGroup();

  return (
    <div {...props}>
      <input
        id={`${radioGroup.id}_${value}`}
        type="radio"
        name={radioGroup.id}
        value={value}
        checked={value === radioGroup.value}
        onChange={() => radioGroup.onValueChange(value)}
        className="peer absolute appearance-none"
      />

      {children}
    </div>
  );
};
RadioGroupItem.displayName = 'RadioGroupItem';

interface RadioGroupItemButtonProps
  extends React.HTMLAttributes<HTMLLabelElement> {
  value: string;
}

const RadioGroupItemButton = ({
  value,
  className,
  children,
  ...props
}: RadioGroupItemButtonProps) => {
  const radioGroup = useRadioGroup();

  return (
    <label
      htmlFor={`${radioGroup.id}_${value}`}
      className={cn(
        'flex min-h-8 min-w-14 items-center justify-center border border-black p-1 font-medium ring ring-transparent transition-colors peer-checked:ring-black peer-focus:ring-black hover:ring-black',
        className,
      )}
      {...props}
    >
      {children}
    </label>
  );
};
RadioGroupItemButton.displayName = 'RadioGroupItemButton';

interface RadioGroupItemButtonColorProps
  extends React.HTMLAttributes<HTMLLabelElement> {
  value: string;
  color: string;
}

const RadioGroupItemButtonColor = ({
  value,
  color,
  className,
  ...props
}: RadioGroupItemButtonColorProps) => {
  const radioGroup = useRadioGroup();
  return (
    <label
      htmlFor={`${radioGroup.id}_${value}`}
      className={cn(
        'flex h-8 w-8 items-center justify-center rounded-full border border-black p-1 font-medium ring ring-transparent transition-colors peer-checked:ring-black peer-focus:ring-black hover:ring-black',
        className,
      )}
      {...props}
    >
      <span
        className="h-full w-full rounded-full text-transparent"
        style={{
          backgroundColor: color,
        }}
      >
        <span className="sr-only">{value}</span>
      </span>
    </label>
  );
};
RadioGroupItemButtonColor.displayName = 'RadioGroupItemButtonColor';

export {
  RadioGroup,
  RadioGroupItem,
  RadioGroupItemButton,
  RadioGroupItemButtonColor,
};
