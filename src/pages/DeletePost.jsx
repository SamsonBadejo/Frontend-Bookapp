import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId: id }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

  // REDIRECT TO LOGIN PAGE FOR ANY USER THAT IS NOT LOGGED IN

  useEffect(() => {
    if (!currentUser?.token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (response.status === 200) {
        if (location.pathname === `/posts/${currentUser.user.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log("could not delete post", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <Link
        onClick={() => removePost(id)} // DELETE FUNCTION
        className="btn primary"
      >
        <motion.button
          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Delete
        </motion.button>
      </Link>
    </div>
  );
};

export default DeletePost;
