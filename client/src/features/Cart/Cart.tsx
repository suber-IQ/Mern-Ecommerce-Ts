import React from 'react';
import CartBlock from '../../layouts/Cart/CartBlock';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartProps {
  cartItems: CartItem[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Your Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <div className="flex flex-col">
          {cartItems.map((item) => (
              <CartBlock key={item.id} image={item.image} price={item.price} quantity={item.quantity} title={item.title}  />
          ))}
          <div className="flex justify-end">
            <div>
              <p className="text-gray-600">Subtotal ({cartItems.length} items):</p>
              <p className="font-bold">₹{totalPrice.toFixed(2)}</p>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-yellow-500 text-white font-bold hover:bg-yellow-600 py-2 px-4 rounded-md">
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
