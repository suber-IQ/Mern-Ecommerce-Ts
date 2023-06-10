import React, { ReactNode } from 'react';

interface HeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
  className?: string;
}

const CustomHeading: React.FC<HeadingProps> = ({ level, children, className }) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseClasses = 'font-bold leading-tight';
  let levelClasses = '';

  switch (level) {
    case 1:
      levelClasses = 'text-4xl';
      break;
    case 2:
      levelClasses = 'text-3xl';
      break;
    case 3:
      levelClasses = 'text-2xl';
      break;
    case 4:
      levelClasses = 'text-xl';
      break;
    case 5:
      levelClasses = 'text-lg';
      break;
    case 6:
      levelClasses = 'text-base';
      break;
    default:
      levelClasses = 'text-2xl';
  }

  const combinedClasses = `${baseClasses} ${levelClasses} ${className}`;

  return <HeadingTag className={combinedClasses}>{children}</HeadingTag>;
};

export default CustomHeading;
