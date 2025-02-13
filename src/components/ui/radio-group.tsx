'use client';

import { createContext, useContext, useId } from 'react';

import { cn } from '@/lib/cn';

interface RadioGroupContextProps {
  id: string;
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupContext = createContext<RadioGroupContextProps | undefined>(
  undefined,
);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);

  if (context === undefined) {
    throw new Error('useRadioGroup must be used within a RadioGroupProvider');
  }

  return context;
};

interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

export const RadioGroup = ({
  className,
  value,
  onValueChange,
  ...props
}: RadioGroupProps) => {
  const id = useId();

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

export const RadioGroupItem = ({
  value,
  children,
  ...props
}: RadioGroupItemProps) => {
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

export const RadioGroupItemButton = ({
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

interface RadioGroupItemColor extends React.HTMLAttributes<HTMLLabelElement> {
  value: string;
  color: string;
}

export const RadioGroupItemColor = ({
  value,
  color,
  className,
  ...props
}: RadioGroupItemColor) => {
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
RadioGroupItemColor.displayName = 'RadioGroupItemColor';
