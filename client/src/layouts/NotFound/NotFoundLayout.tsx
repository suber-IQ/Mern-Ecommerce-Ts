import React from 'react';
import CustomRouteLink from '../../components/RouteLink/CustomRouteLink';

const NotFoundLayout: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">The page you are looking for does not exist.</p>
      <CustomRouteLink to="/" className="text-blue-500 underline">Go back to home</CustomRouteLink>
    </div>
  );
};

export default NotFoundLayout;
