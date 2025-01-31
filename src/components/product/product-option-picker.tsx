'use client';

import { useProduct } from '@/hooks/use-product';
import { cn } from '@/lib/cn';

import {
  ProductOptionColorSelect,
  ProductOptionSelect,
  ProductOptionSizeSelect,
} from './product-option-select';

const ProductOptionPicker = () => {
  const { productOptions } = useProduct();

  return (
    <ProductOptionList className="flex flex-col gap-6">
      {productOptions.map((option) => (
        <ProductOptionGroup
          key={option.name}
          name={option.name}
          values={option.optionValues}
        />
      ))}
    </ProductOptionList>
  );
};
ProductOptionPicker.displayName = 'ProductOptionPicker';

const ProductOptionList = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return <div className={className} {...props} />;
};
ProductOptionList.displayName = 'ProductOptionList';

const ProductOptionLabel = ({
  name,
  className,
  ...props
}: Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> & {
  name: string;
}) => {
  const { currentOptions } = useProduct();

  return (
    <span className={cn('uppercase', className)} {...props}>
      {name} : {currentOptions[name]}
    </span>
  );
};
ProductOptionLabel.displayName = 'ProductOptionLabel';

const ProductOptionGroup = ({
  name,
  values,
}: {
  name: string;
  values: {
    name: string;
    swatch?: {
      color?: string;
    } | null;
  }[];
}) => {
  if (values.every((value) => typeof value.swatch?.color === 'string')) {
    return (
      <div>
        <ProductOptionLabel name={name} />
        <ProductOptionColorSelect
          name={name}
          values={
            values as {
              name: string;
              swatch: {
                color: string;
              };
            }[]
          }
        />
      </div>
    );
  }

  if (Object.freeze(['Size', 'Quantity']).includes(name)) {
    return (
      <div>
        <ProductOptionLabel name={name} />
        <ProductOptionSizeSelect name={name} values={values} />
      </div>
    );
  }

  return (
    <div>
      <ProductOptionLabel name={name} />
      <ProductOptionSelect name={name} values={values} />
    </div>
  );
};
ProductOptionGroup.displayName = 'ProductOptionGroup';

export { ProductOptionPicker, ProductOptionList, ProductOptionGroup };
