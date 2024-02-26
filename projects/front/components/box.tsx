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
  style?: object;
  onMouseEnter?: MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: MouseEventHandler<HTMLDivElement>;
  onKeyDown?: KeyboardEventHandler<HTMLDivElement>;
}

export const Box = forwardRef<HTMLDivElement, BoxType>(
  (
    { block = false, className, children, onClick, onKeyDown, ...params },
    ref
  ) => {
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
  }
);

Box.displayName = 'Box';
