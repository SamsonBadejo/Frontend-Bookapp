import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import DarkMode from "./DarkMode";
import Logo from "../images/WhatsApp Image 2024-08-02 at 22.44.38_e83d41e5.png";
import { UserContext } from "../context/userContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(UserContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      initial={{ y: -250 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="bg-brown-900 dark:bg-black text-white shadow-lg"
    >
      <div className="container mx-auto p-2 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <motion.img
            src={Logo}
            alt="Navbar Logo"
            className="w-16 bg-white dark:bg-orange-500 rounded-full p-1"
            whileHover={{ scale: 1.1 }}
          />
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
          >
            Contact Us
          </Link>
          {currentUser ? (
            <>
              <Link
                to={`/profile/${currentUser?.user?.id}`} // Dynamic profile link
                className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              >
                {currentUser?.user?.name} {/* Display name or fallback */}
              </Link>
              <Link
                to="/create"
                className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              >
                Create Post
              </Link>
              <Link
                to="/authors"
                className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              >
                Authors
              </Link>
              <Link
                to="/logout"
                className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              >
                Logout
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              >
                Login
              </Link>
              
            </>
          )}
          <DarkMode />
        </div>
        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          className="md:hidden bg-brown-900 dark:bg-black shadow-lg"
        >
          <ul className="flex flex-col items-center space-y-4 py-4">
            <Link
              to="/"
              className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
              onClick={toggleMenu}
            >
              Contact Us
            </Link>
            {currentUser ? (
              <>
                <li>
                  <Link
                    to={`/profile/${currentUser.user.id}`} // Dynamic profile link
                    className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
                    onClick={toggleMenu}
                  >
                    {currentUser.user.name || "User"} {/* Display name or fallback */}
                  </Link>
                </li>
                <li>
                  <Link
                    to="/create"
                    className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Create Post
                  </Link>
                </li>
                <li>
                  <Link
                    to="/authors"
                    className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Authors
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="hover:text-yellow-300 dark:hover:text-yellow-300 hover:scale-110 transition duration-300"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                </li>
              </>
            )}
            <DarkMode />
          </ul>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Header;
