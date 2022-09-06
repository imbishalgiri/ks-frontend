import { Navigate } from "react-router-dom";

export const isLoggedIn = () => {
  return localStorage.getItem("ks-user-token") ? true : false;
};

const Protected = ({ children }) => {
  if (isLoggedIn()) {
    return children;
  }
  return <Navigate to="/login" replace />;
};

export default Protected;
