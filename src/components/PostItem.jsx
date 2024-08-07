import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PostAuthor from "./PostAuthor";

const PostItem = ({
  postID,
  category,
  title,
  description,
  authorID,
  thumbnail,
  createdAt,
}) => {
  const shortDescription =
    description.length > 140 ? description.substr(0, 145) + "..." : description;
  const shortTitle = title.length > 30 ? title.substr(0, 70) + "..." : title;

  // Format createdAt to show only the date
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <motion.article
      className="post dark:bg-black bg-white text-black dark:text-white p-4 rounded-lg shadow-lg mb-8 transition-all duration-300 hover:shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.03 }}
    >
      <div className="post_thumbnail mb-4 overflow-hidden rounded-lg">
        <motion.img
          src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${thumbnail}`}
          alt={title}
          className="w-full h-69 object-cover transition-transform duration-500 hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        />
      </div>
      <div className="post_content">
        <Link to={`/posts/${postID}`}>
          <h3 className="title text-xl font-semibold mb-2 transition-colors duration-300 dark:text-orange-500 dark:hover:text-orange-700 text-brown-900 hover:text-brown-900">
            {shortTitle}
          </h3>
        </Link>
        <p dangerouslySetInnerHTML={{ __html: shortDescription }} className="mb-3 text-black  dark:text-gray-300">
        </p>
        <div className="post_footer flex flex-col items-start text-sm text-gray-600 dark:text-gray-400">
          <PostAuthor authorID={authorID} createdAt={createdAt} />
          <div className="flex items-center space-x-2 mt-2">
            <Link
              to={`/posts/categories/${category}`}
              className="text-blue-500 hover:text-blue-700 transition-colors duration-300"
            >
              {category}
            </Link>
            <span className="text-gray-500 dark:text-gray-400">|</span>
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PostItem;
