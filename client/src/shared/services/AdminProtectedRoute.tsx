import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Navigate } from "react-router-dom";


interface ProtectedAdminProps {
      children: React.ReactNode;
}

const AdminProtectedRoute: React.FC<ProtectedAdminProps> = ({children}) => {
  const { loading, isAuthenticated, user } = useSelector((state: RootState) => state.user);
      if(loading) return null;
      if(isAuthenticated === false){
        return <Navigate to="/login" replace={true} />
      }
      if(user?.role !== "admin"){
        return <Navigate to="/" replace={true} />
      }

      return <>{children}</>;
}

export default AdminProtectedRoute;