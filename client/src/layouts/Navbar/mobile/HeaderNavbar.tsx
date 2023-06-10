import logo from '../../../assets/react.svg';
import CustomRouteLink from '../../../components/RouteLink/CustomRouteLink';
import SearchBar from '../SearchBar';


const HeaderNavbar = () => {
 
  return (
    <header className='lg:hidden flex justify-evenly fixed top-0 z-50 bg-primary shadow-white py-2 w-full'>
      <CustomRouteLink to="/">
       <img className='animate-spin' src={logo} alt="ecommerce-icon" />

      </CustomRouteLink>
       <SearchBar />
    </header>
  )
}

export default HeaderNavbar