import { cn } from '@/lib/utils/cn';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: ReactNode;
}

function Button({
  children,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      className={cn(
        "button click-scale", //utility
        "py-1 px-3",
        "rounded-lg",
        "text-white-utility",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button