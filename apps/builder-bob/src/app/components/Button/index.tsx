import classNames from 'classnames';
import { PropsWithChildren } from 'react';

type ButtonProps = PropsWithChildren & {
  className?: string;
  onClick?: () => void;
  style?: 'primary' | 'transparent';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

export default function Button({
  className,
  children,
  style = 'primary',
  type = 'button',
  disabled = false,
  onClick,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        {
          'text-white py-2 px-4 rounded-xl bg-lime-500 shadow-2xl hover:bg-lime-600 active:bg-lime-700':
            style === 'primary',
          '!bg-lime-100 !cursor-not-allowed': disabled,
        },
        className
      )}
    >
      {children}
    </button>
  );
}
