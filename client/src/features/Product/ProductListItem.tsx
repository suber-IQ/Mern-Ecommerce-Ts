import CustomButton from '../../components/Button/CustomButton';
import CustomHeading from '../../components/Heading/CustomHeading';
import CustomProductImageSlider from '../../components/ProductImageSlider/CustomProductImageSlider'
import { GrLocation } from 'react-icons/gr';
import ReviewByUser, { Review } from '../Review/ReviewByUserList';
import CustomRouteLink from '../../components/RouteLink/CustomRouteLink';

const images : string[] = [
  'https://rukminim1.flixcart.com/image/224/224/ksw4ccw0/watch/6/b/c/38024pp25-fastrack-men-original-imag6cu9xkhbgz4y.jpeg?q=90',
  'https://rukminim1.flixcart.com/image/224/224/ksw4ccw0/watch/6/b/c/38024pp25-fastrack-men-original-imag6cu9xkhbgz4y.jpeg?q=90',
  'https://rukminim1.flixcart.com/image/224/224/ksw4ccw0/watch/6/b/c/38024pp25-fastrack-men-original-imag6cu9xkhbgz4y.jpeg?q=90',
];

const reviews: Review[] = [
  {
    id: 1,
    name: "John Doe",
    comment: "Great product. Highly recommended!",
    rating: 4,
  },
  {
    id: 2,
    name: "Jane Smith",
    comment: "Excellent service. Will buy again!",
    rating: 5,
  },
  // Add more reviews here
];

const ProductListItem = () => {

  
  return (
    <div className='h-screen overflow-y-auto lg:flex lg:p-2 space-x-4 lg:mt-4 w-full'>
      {/* image Slider */}
      <div className='lg:w-1/3 border-2 h-1/2 p-2'>
         <CustomProductImageSlider images={images}  />
         {/* Add and buy  */}
         <div className='hidden lg:flex space-x-2 my-14'>
            <CustomButton className='block w-full bg-yellow-400 text-slate-900 hover:bg-inherit hover:bg-yellow-500 font-medium rounded-md' children="Add to Cart" />
            <CustomButton className='block w-full bg-yellow-600 text-slate-900 hover:bg-inherit hover:bg-yellow-700 font-medium rounded-md' children="Buy Now" />
         </div>
      </div>
      <div className='lg:w-2/3'>
        {/* title */}
         <CustomHeading level={4} className='px-2 mt-2 font-normal text-justify' children={"Watch a77 (stary bloack ,8 gb ram, 123 storage) with No cost Emi/Additional Exchange offerss"} />
         <span className='block border mt-2 border-gray-300'></span>
         {/* price */}
        <span className='inline-block ml-2 text-red-500'>Deal</span>
        <CustomHeading className='ml-2 mt-1 ' level={4} children={"₹ 16,499"} />
        {/* Location */}
         <div className='flex items-center ml-2 mt-2 space-x-1'>
         <GrLocation />
         <span className='text-secondary'>
         Deliver to UserName - Jaipur 841613
         </span>
         </div>
         {/* Add and buy Now */}
         <div className='lg:hidden space-y-3  flex flex-col mt-4 p-2'>
            <CustomButton className='block w-full bg-yellow-400 text-slate-900 hover:bg-inherit hover:bg-yellow-500 font-medium rounded-md' children="Add to Cart" />
            <CustomButton className='block w-full bg-yellow-600 text-slate-900 hover:bg-inherit hover:bg-yellow-700 font-medium rounded-md' children="Buy Now" />
         </div>
         
         {/* Descrition */}
         <span className='block border mt-2 border-gray-300'></span>

         <div className='mt-2 px-2'>
            <CustomHeading className='font-medium capitalize' level={4} children="Description" />
             <p className='text-justify'>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit in aspernatur soluta expedita, delectus autem voluptatum culpa corrupti asperiores eius quo labore, consequuntur rerum porro quod, doloribus mollitia. Asperiores, autem?
             </p>
         </div>
         <span className='block border mt-2 border-gray-300'></span>
         {/* revwies */}
        <div className='mt-2 p-2'>

       <div className='flex space-x-4'>
       <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
         <CustomRouteLink to={"/user/review"} >
           <CustomButton className='bg-inherit bg-gray-200 w-33 text-black font-medium text-sm text-inherit hover:bg-inherit hover:bg-gray-300' children="Rate Product" />
         </CustomRouteLink>
       </div>
      {reviews.map((review) => (
        <ReviewByUser key={review.id} review={review} />
      ))}
        </div>
      </div>
    </div>
  )
}

export default ProductListItem;