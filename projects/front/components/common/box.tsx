import React, {
  KeyboardEventHandler,
  MouseEventHandler,
  ReactNode,
  forwardRef,
} from 'react';

interface BoxType {
  id?: string;
  block?: boolean;
  className?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
  blocked?: boolean;
  style?: object;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onMouseUp?: MouseEventHandler<HTMLDivElement>;
  onMouseDown?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export const Box = forwardRef<HTMLDivElement, BoxType>(
  (
    {
      block = false,
      className,
      children,
      onClick,
      onKeyDown,
      blocked = false,
      ...params
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${!block && 'flex'} ${onClick && !blocked && 'cursor-pointer'} ${className}`}
        onClick={!blocked ? onClick : () => {}}
        onKeyDown={onKeyDown}
        tabIndex={onClick ? 0 : undefined}
        {...params}
      >
        {children}
      </div>
    );
  }
);

Box.displayName = 'Box';
