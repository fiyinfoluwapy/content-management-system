import React from 'react';
type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  const baseStyles = 'rounded-lg font-medium transition-all shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantStyles = {
    primary: 'bg-[#843722] hover:bg-[#6D2E1C] text-white focus:ring-[#843722]',
    secondary: 'bg-[#C69076] hover:bg-[#B27E66] text-[#260701] focus:ring-[#C69076]',
    danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-600'
  };
  const sizeStyles = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-2.5 px-5 text-lg'
  };
  const widthStyles = fullWidth ? 'w-full' : '';
  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  return <button type={type} onClick={onClick} disabled={disabled} className={`
        ${baseStyles} 
        ${variantStyles[variant]} 
        ${sizeStyles[size]} 
        ${widthStyles}
        ${disabledStyles}
      `}>
      {children}
    </button>;
};
export default Button;