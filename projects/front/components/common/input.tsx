import React, { ChangeEventHandler } from 'react';

interface InputType {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  disabled?: boolean;
}

export const Input = ({
  type = 'text',
  className,
  value,
  onChange,
  ...props
}: InputType) => {
  return (
    <input
      type={type}
      className={'focus:outline-none ' + className}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
