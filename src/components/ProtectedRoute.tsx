import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

const ProtectedRoute = ({ children }:any) => {
  const { user , loading } : any = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  return children;
};

export default ProtectedRoute;
