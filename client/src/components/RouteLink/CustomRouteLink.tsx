import { Link, LinkProps, useLocation } from 'react-router-dom';

interface RouteLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string;
}

const CustomRouteLink: React.FC<RouteLinkProps> = ({
  to,
  children,
  className = '',
  ...rest
}) => {
  const combinedClassName = `text-secondary hover:text-accent rounded-md ${className}`;
  const location = useLocation();
  const isActive = location.pathname === to;

  const activeStyle = `text-accent text-lg ${className}`;

  return (
    <Link to={to} className={isActive ? activeStyle : combinedClassName} {...rest}>
      {children}
    </Link>
  );
};

export default CustomRouteLink;
