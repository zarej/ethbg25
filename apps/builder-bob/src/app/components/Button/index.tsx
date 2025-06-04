import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
  style?: 'primary' | 'transparent';
  type?: 'button' | 'submit' | 'reset';
};

export default function Button({
  className,
  children,
  style = 'primary',
  type = 'button',
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        {
          'text-white py-2 px-4 rounded-xl bg-lime-500 shadow-2xl hover:bg-lime-600 active:bg-lime-700':
            style === 'primary',
        },
        className
      )}
    >
      {children}
    </button>
  );
}
