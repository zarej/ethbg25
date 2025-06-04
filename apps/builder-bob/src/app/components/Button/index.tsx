import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
  type?: 'primary';
};

export default function Button({
  className,
  children,
  type,
  onClick,
}: ButtonProps) {
  return (
    <button
      className={classNames(
        'text-white py-2 px-4 rounded-xl bg-lime-500 shadow-2xl hover:bg-lime-600 active:bg-lime-700',
        className
      )}
    >
      {children}
    </button>
  );
}
