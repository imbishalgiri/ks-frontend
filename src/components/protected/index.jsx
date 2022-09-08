import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const isLoggedIn = () => {
  return localStorage.getItem("ks-user-token") ? true : false;
};

const Protected = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  if (isLoggedIn() && !user?.isBrandNew) {
    return children;
  }
  if (isLoggedIn()) {
    return <Navigate to="/initial" replace />;
  }
  return <Navigate to="/login" replace />;
};

export default Protected;
