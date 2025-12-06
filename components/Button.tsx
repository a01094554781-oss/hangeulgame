import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "font-display rounded-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.1)] active:shadow-none active:translate-y-[4px] transition-all duration-150 flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-brand-500 text-white hover:bg-brand-600 border-2 border-brand-600",
    secondary: "bg-white text-brand-700 hover:bg-brand-50 border-2 border-brand-200",
    danger: "bg-red-400 text-white hover:bg-red-500 border-2 border-red-500",
    success: "bg-accent text-brand-900 hover:bg-accent-hover border-2 border-accent-hover",
  };

  const sizes = {
    sm: "px-3 py-1 text-sm",
    md: "px-6 py-3 text-lg",
    lg: "px-8 py-4 text-xl",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};