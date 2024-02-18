import { ChangeEventHandler } from 'react';

interface InputType {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const Input = ({ className, value, onChange, ...props }: InputType) => {
  return (
    <input
      className={'focus:outline-none ' + className}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
};
