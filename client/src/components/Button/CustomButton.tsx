import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children: React.ReactNode;
};

const CustomButton: React.FC<ButtonProps> = ({ className, children, ...rest }) => {
  const defaultButtonStyle = 'bg-blue-300 hover:bg-sky-400 font-medium py-2 px-4 rounded'
  return (
    <button
      className={`${className} ${defaultButtonStyle}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default CustomButton;
