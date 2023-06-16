import HeaderNavbar from './mobile/HeaderNavbar';
import logo from '../../assets/react.svg';
import { AiOutlineShoppingCart, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { useEffect, useRef, useState } from 'react';
import SearchBar from './SearchBar';
import CustomRouteLink from '../../components/RouteLink/CustomRouteLink';
import BottomNavbar from './mobile/BottomNavbar';
import AccountLayout from '../Account/Account';
import { RootState } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { logoutUser } from '../../features/Auth/Logout/logout.action';
import { toast } from 'react-toastify';
import { clearLogoutErrors } from '../../features/Auth/Logout/logout.reducer';

const Navbar = () => {

  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const { error,response } = useSelector((state: RootState) => state.logout);
  const [showSearchBar, setShowSearchBar] = useState(false);
  // const [openCloseAccount,setOpenCloseAccount] = useState(true);
  const searchRef = useRef<HTMLDivElement>(null);
  const [toggleAccount,setToggleAccount] = useState(false);

  const toggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };
 

  const handleAccountToggle = () => {
    // setOpenCloseAccount(!openCloseAccount);
    setToggleAccount(!toggleAccount);
  }
  useEffect(() => {
    if (error) {
      console.log(error);

      toast.error("Logout failed: " + String(error));
      return () => {
        dispatch(clearLogoutErrors());
      };
    }
    
    if(response && response.success === true) {
      toast.error("Logout failed: " + String(response.message));
    }
  }, [response?.success, dispatch, error]);
 
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

  // const handleLogout = () => {
  //   dispatch(logoutUser());
    
  // }
  return (
    <>
      {/* Mobile and Tablet Screen */}
      <div className='lg:hidden'>
        <HeaderNavbar />
        <BottomNavbar />
      </div>
      {/* laptop and lg screen */}
      <nav className='bg-primary z-40 fixed top-0 shadow-white w-full'>
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
                <CustomRouteLink to={"/"} children="Home" />
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
                  <AiOutlineSearch size="23" className="cursor-pointer" onClick={toggleSearchBar} />
                ) : (
                  <SearchBar />
                )}
              </div>
              <CustomRouteLink to={'/cart'}>
                <AiOutlineShoppingCart size="24" />
              </CustomRouteLink>
              {/* after use this  */}
              {/* <div className='relative'>
              <AiOutlineUser onClick={handleAccountToggle} size="24" />
                <div className='absolute right-0 mt-2 w-40 z-40 bg-white rounded shadow-md'>
                 <div className='flex flex-col space-y-2'>
                 <CustomRouteLink to={'/login'} children="Login" />
                  <CustomRouteLink to={'/signup'} children="Signup" />
                 </div>
                </div>
                <div className='absolute right-0 mt-2 w-40 z-40 bg-white rounded shadow-md'>
                    <AccountLayout onLogout={handleLogout} />
                 </div>
              </div> */}

              {/* isAuthencated or not */}
             {/* {
              isAuthenticated ?  (
                <div className="relative">
                {openCloseAccount && (
                  <div className="absolute right-0 mt-2 w-40 z-40 bg-white rounded shadow-md">
                    <AccountLayout onLogout={handleLogout} />
                  </div>
                )}
              </div>
              ) : (
                <CustomRouteLink to={'/signup'}>
                  <AiOutlineUser size="24" />
                </CustomRouteLink>
              ) 
             } */}

              
              
              {/* <CustomRouteLink to={'/account/signup'}>
              </CustomRouteLink> */}
            </div>

          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar