import { ReactNode } from 'react';

interface TextInput {
  className?: string;
  children?: ReactNode;
}

export const Text = ({ className = 'aa', children }: TextInput) => {
  const hasTextColorClass = className.match(/text-(?!xl|lg|md|sm|xs)/);

  return (
    <p className={`${!hasTextColorClass ? 'text-primary ' : ''}${className}`}>
      {children}
    </p>
  );
};
