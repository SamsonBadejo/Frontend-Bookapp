import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  // Redirect to login page for any user that is not logged in
  useEffect(() => {
    if (!currentUser?.token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    };

    fetchPosts();
  }, [id, currentUser]);

  const removePost = async (postId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );
      if (response.status === 200) {
        setPosts(posts.filter(post => post._id !== postId));
      }
    } catch (error) {
      console.log("Could not delete post", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex justify-center items-center bg-gray-200 dark:bg-gray-900 py-10">
      <motion.section
        className="dashboard_container w-full max-w-4xl mx-auto p-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {posts.length ? (
          <div className="space-y-4">
            {posts.map((post) => (
              <motion.article
                key={post.id}
                className="dashboard_post flex bg-brown-900 dark:bg-black rounded-lg shadow-lg overflow-hidden"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="dashboard_post-thumbnail flex-shrink-0 p-4">
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
                    alt={post.title}
                    className="w-20 h-20 object-cover rounded-full border-2 border-gray-300 dark:border-gray-700"
                  />
                </div>
                <div className="flex flex-col justify-between p-4 flex-grow">
                  <h5 className="dashboard_post-title text-lg font-semibold text-white dark:text-white mb-2">
                    {post.title}
                  </h5>
                  <div className="dashboard_post-actions mt-2 space-x-2 self-end">
                    <Link
                      to={`/posts/${post._id}`}
                      className="btn bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                    >
                      View
                    </Link>
                    <Link
                      to={`/posts/${post._id}/edit`}
                      className="btn bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 transition-colors duration-300"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => removePost(post._id)}
                      className="btn bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <motion.h2
            className="text-center text-2xl font-semibold text-gray-900 dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            You have no posts yet
          </motion.h2>
        )}
      </motion.section>
    </div>
  );
};

export default Dashboard;
