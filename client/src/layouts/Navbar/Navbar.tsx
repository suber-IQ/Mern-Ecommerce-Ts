import HeaderNavbar from './mobile/HeaderNavbar';
import logo from '../../assets/react.svg';
import { AiOutlineShoppingCart, AiOutlineUser, AiOutlineSearch} from 'react-icons/ai';
import {  useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import CustomRouteLink from '../../components/RouteLink/CustomRouteLink';
import BottomNavbar from './mobile/BottomNavbar';

const Navbar = () => {
    const [showSearchBar, setShowSearchBar] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
  
    const toggleSearchBar = () => {
      setShowSearchBar(!showSearchBar);
    };
  
    useEffect(() => {
      const handleOutsideClick = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setShowSearchBar(false);
        }
      };
  
      document.addEventListener('mousedown', handleOutsideClick);
  
      return () => {
        document.removeEventListener('mousedown', handleOutsideClick);
      };
    }, []);
  return (
    <>
      {/* Mobile and Tablet Screen */}
      <div className='lg:hidden'>
          <HeaderNavbar /> 
          <BottomNavbar />  
      </div>
      {/* laptop and lg screen */}
        <nav className='bg-primary fixed top-0 shadow-white w-full'>
         <div className='container mx-auto px-4'>
             <div className='hidden lg:flex justify-between items-center h-16'>

                {/* Navigation link */}
                <ul className='flex items-center space-x-6'>
               <li>
               <CustomRouteLink to={"/"} className='flex items-center'>
                  <img className='animate-spin' src={logo} alt="react-icons" />
                </CustomRouteLink>
               </li>
                    <li>
                        <CustomRouteLink to={"/"}  children="Home" />
                    </li>
                    <li>
                        <CustomRouteLink to={"/products"} children="Products" />
                    </li>
                    <li>
                        <CustomRouteLink to={"/about"} children="About" />
                    </li>
                    <li>
                        <CustomRouteLink to={"/contacts"} children="Contact Us" />
                    </li>
                </ul>

                {/* Account and Cart Icons */}
                <div className='flex items-center space-x-4'>
                <div ref={searchRef}> 
                {!showSearchBar ? (
          <AiOutlineSearch size="23" onClick={toggleSearchBar} />
        ) : (
          <SearchBar />
        )}
                </div>
                    <CustomRouteLink to={'/cart'}>
                        <AiOutlineShoppingCart size="24" />
                    </CustomRouteLink>
                    <CustomRouteLink to={'/account/signup'}>
                        <AiOutlineUser size="24" />
                    </CustomRouteLink>
                </div>

             </div>
         </div>
      </nav>
    </>
  )
}

export default Navbar