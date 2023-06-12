import React, { useState } from 'react';
import CustomButton from '../../components/Button/CustomButton';
import CustomHeading from '../../components/Heading/CustomHeading';

interface CartBlockProps {
  title: string;
  price: number;
  quantity: number;
  image: string;
  onRemove?: () => void;
}

const CartBlock: React.FC<CartBlockProps> = ({ title, price, quantity, image,onRemove }) => {
  const [itemQuantity, setItemQuantity] = useState(quantity);

  const handleIncrement = () => {
    setItemQuantity(itemQuantity + 1);
  };

  const handleDecrement = () => {
    if (itemQuantity > 1) {
      setItemQuantity(itemQuantity - 1);
    }
  };

  return (
    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-4 mb-4">
      <div className="flex items-center">
        <img src={image} alt="Product Image" className="w-24 h-24 object-contain" />
        <div className="ml-4">
            <CustomHeading  className='text-xl font-medium' children={title} />
            <CustomHeading level={5} className='text-gray-500' children={`₹${price.toFixed(2)}`} />
        </div>
      </div>
      <div className="flex items-center">
      <CustomButton onClick={handleDecrement}children={"-"} className='font-normal ml-2' />
        <span className="px-4">{itemQuantity}</span>
      <CustomButton onClick={handleIncrement}children={"+"} className='font-normal ml-2' />

      </div>
      <CustomButton onClick={onRemove} children="Remove" className='font-normal ml-2' />
    </div>
  );
};

export default CartBlock;
