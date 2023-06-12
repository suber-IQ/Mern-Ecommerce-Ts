import Cart from "../../features/Cart/Cart"

const cartItems = [
  {
    id: 1,
    title: 'Product 1',
    price: 10.99,
    quantity: 2,
    image: 'https://rukminim1.flixcart.com/image/224/224/ksw4ccw0/watch/6/b/c/38024pp25-fastrack-men-original-imag6cu9xkhbgz4y.jpeg?q=90',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 5.99,
    quantity: 3,
    image: 'https://rukminim1.flixcart.com/image/224/224/ksw4ccw0/watch/6/b/c/38024pp25-fastrack-men-original-imag6cu9xkhbgz4y.jpeg?q=90',
  },
  // Add more items as needed
];

const CartPage = () => {
  return (
      <>
       <Cart cartItems={cartItems} />

      </>
  )
}

export default CartPage