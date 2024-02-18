import {
  LegacyRef,
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
} from 'react';

interface BoxType {
  id?: string;
  block?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  style?: object;
  ref?: LegacyRef<HTMLDivElement>;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export const Box = ({
  block = false,
  className,
  children,
  onClick,
  ref,
  onKeyDown,
  ...params
}: BoxType) => {
  return (
    <div
      ref={ref}
      className={`${!block && 'flex'} ${onClick && 'cursor-pointer'} ${className}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      {...params}
    >
      {children}
    </div>
  );
};
