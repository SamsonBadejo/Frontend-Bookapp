import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.js";

const Logout = () => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from context and localStorage
    setCurrentUser(null);
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  }, [setCurrentUser, navigate]);

  return null;
};

export default Logout;
