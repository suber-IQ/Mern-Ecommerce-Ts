import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

const CustomButton: React.FC<ButtonProps> = ({ className, children, ...rest }) => {
  return (
    <button
      className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring focus:border-blue-300 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
