import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "../components/Loader";
import { FaUser, FaFileAlt, FaEnvelope } from "react-icons/fa";

const Authors = () => {
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAuthors = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setAuthors(response?.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };
    getAuthors();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <section className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {authors.length > 0 ? (
            authors.map(({ _id: id, avatar, name, email, posts }) => (
              <Link
                to={`/posts/users/${id}`}
                key={id}
                className="block p-4 bg-brown-200 dark:bg-black rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-4"
                >
                  <div className="relative">
                    <motion.img
                      src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                      alt={`${name} Avatar`}
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FaUser className="text-white text-xl opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  <div className="author_info">
                    <h3 className="text-xl font-bold text-black dark:text-orange-500">
                      {name}
                    </h3>
                    <p className="text-gray-800 dark:text-gray-400 flex items-center">
                      <FaEnvelope className="mr-2" /> {email}
                    </p>
                    <p className="text-gray-800 dark:text-gray-400 flex items-center">
                      <FaFileAlt className="mr-2" /> {posts} Posts
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-700 dark:text-gray-400">
              No authors found
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Authors;
