interface TextInput {
  className?: string;
  children?: string | number;
}

export const Text = ({ className = 'aa', children }: TextInput) => {
  const hasTextColorClass = className.match(/text-(?!xl|lg|md|sm|xs)/);

  return (
    <p className={`${!hasTextColorClass && 'text-primary'} ${className}`}>
      {children}
    </p>
  );
};
