import { FaHome, FaList, FaBell, FaUser, FaShoppingCart } from 'react-icons/fa';
import CustomRouteLink from '../../../components/RouteLink/CustomRouteLink';


const BottomNavbar = () => {
  return (
      <nav className="fixed bottom-0 z-30 h-16 left-0 w-full bg-primary p-4">
         <ul className='flex justify-around'>
            <li>
                  <CustomRouteLink to={"/"} className='flex flex-col items-center'>
                      <FaHome
                      />  
                     <small>Home</small>
                  </CustomRouteLink>
            </li>
            <li>
                  <CustomRouteLink to={"/products"} className='flex flex-col items-center'>
                      <FaList />  
                     <small>Products</small>
                  </CustomRouteLink>
            </li>
            <li>
                  <CustomRouteLink to={"/notifications"} className='flex flex-col items-center'>
                      <FaBell  />  
                     <small>Notifications</small>
                  </CustomRouteLink>
            </li>
            <li>
                  <CustomRouteLink to={"/account/signup"} className='flex flex-col items-center'>
                      <FaUser />  
                     <small>Account</small>
                  </CustomRouteLink>
            </li>
            <li>
                  <CustomRouteLink to={"/cart"} className='flex flex-col items-center'>
                      <FaShoppingCart />  
                     <small>Cart</small>
                  </CustomRouteLink>
            </li>
         </ul>
      </nav>
  )
}

export default BottomNavbar