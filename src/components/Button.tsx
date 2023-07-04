import React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  success?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", children, success, ...props }, ref) => {
    const styles = success
      ? "bg-green-500 hover:bg-green-800"
      : "bg-zinc-900 hover:bg-zinc-800";
    return (
      <button
        className={`active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-zinc-100 h-10 py-2 px-4 ${className} ${styles}`}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button };
