import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'w-full rounded-[10px] border border-natural-5/60 bg-natural-2 px-5 py-3 text-[13px] font-bold text-natural-8 outline-none dark:border-natural-8 dark:bg-darkbg-2 dark:text-white focus:ring-1 focus:ring-primary active:ring-1 active:ring-primary',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
