import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...rest }) => {
  return (
    <button
      {...rest}
      className={`inline-flex items-center justify-center rounded-full px-4 py-2 font-semibold transition-transform duration-200 ease-in-out ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
