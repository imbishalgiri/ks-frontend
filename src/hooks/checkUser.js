import { useSelector } from "react-redux";

const useUser = () => {
  const { user } = useSelector((state) => state.auth);

  const isThisUser = (id) => {
    if (user.role === "admin") {
      return true;
    }
    return user?._id === id;
  };

  return [isThisUser];
};

export default useUser;
