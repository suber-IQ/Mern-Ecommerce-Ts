import React, { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string | boolean;
}

const Input: React.FC<InputProps> = ({ label, className, error, ...rest }) => {
  const inputClassName = `border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-blue-300 ${className}`;

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={rest.id} className="block text-gray-700 text-md font-bold mb-2">
          {label}
        </label>
      )}
      <input {...rest} className={inputClassName} />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input;
