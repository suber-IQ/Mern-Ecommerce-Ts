import React from 'react';
import { FiUser, FiShoppingCart, FiLogOut } from 'react-icons/fi';
import CustomRouteLink from '../../components/RouteLink/CustomRouteLink';

interface AccountLayoutProps {
  onLogout: () => void;
  
}

const AccountLayout: React.FC<AccountLayoutProps> = ({ onLogout}) => {
  return (
    <div className="flex flex-col p-4 space-y-8">
      <CustomRouteLink to={"/user/profile"} className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 focus:outline-none">
        <FiUser size={20} />
        <span>Profile</span>
      </CustomRouteLink>
      <CustomRouteLink to={"/user/order"} className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 focus:outline-none">
        <FiShoppingCart size={20} />
        <span>My Order</span>
      </CustomRouteLink>
      <CustomRouteLink
        to={"/account/login"}
        className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 focus:outline-none"
        onClick={onLogout}
      >
        <FiLogOut size={20} />
        <span>Logout</span>
      </CustomRouteLink>
    </div>
  );
};

export default AccountLayout;
