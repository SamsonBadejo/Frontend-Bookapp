import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./CSS/Footer.css";

const categories = [
  "Fantasy",
  "Science-Fiction",
  "Romance",
  "Mystery-Thriller",
  "Historical-Fiction",
  "Non-Fiction",
  "Young-Adult",
  "Children's-Books",
  "Anime-Manga",
  "Novels-Comics",
];

const footerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function Footer() {
  return (
    <motion.footer
      initial="hidden"
      animate="visible"
      variants={footerVariants}
      transition={{ duration: 0.5 }}
      className="footer text-white"
    >
      <div className="bg-brown-900 dark:bg-black mx-auto overflow-hidden">
        <h2 className="text-2xl dark:text-white text-orange-500 font-bold text-center py-4">Categories</h2>
        <ul className="footer_categories grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1">
          {categories.map((category, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.05, rotate: 2 }} // Reduced scale and rotation
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden" // Add overflow hidden to list items
            >
              <Link
                to={`/posts/categories/${category.replace(/ /g, "-")}`}
                className="text-lg text-center block transition duration-300"
              >
                {category}
              </Link>
            </motion.li>
          ))}
        </ul>
        <hr className="my-8 border-2 border-white dark:border-gray-800" />
        <p className="text-center dark:text-white text-white">
          &copy; {new Date().getFullYear()} Badejo Samson. All Rights Reserved.
        </p>
      </div>
    </motion.footer>
  );
}

export default Footer;
