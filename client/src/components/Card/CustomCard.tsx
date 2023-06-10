import React from 'react';

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  className?: string;
}

const CustomCard: React.FC<ProductCardProps> = ({ title, price, image, className }) => {
  const cardClassName = `bg-white shadow-md rounded-md p-4 ${className}`;

  return (
    <div className={cardClassName}>
      <img src={image} alt="Product Image" className="w-full h-40 object-contain mb-4" />
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500">₹{price.toFixed(2)}</p>
     
    </div>
  );
};

export default CustomCard;
