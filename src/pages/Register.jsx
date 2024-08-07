import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
// import backgroundImage from "../images/anime-4k-5200X2925-wallpaper-4dibiechlcl9g3cq.jpg";
import axios from "axios";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const changeInputHandler = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setError("");

    if (userData.password !== userData.password2) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/register`,
        userData
      );
      const newUser = response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again.");
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Registration error: ", error);
      setError(error.response?.data?.message || "An error occurred during registration");
    }
  };

  return (
    <div
      className="flex items-center bg-brown-900 dark:bg-black justify-center w-full py-[3rem] bg-cover bg-center relative"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* <motion.div
        className="absolute inset-0 bg-black opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1 }}
      /> */}
      <motion.section
        className="bg-black/30 dark:bg-black/50 bg-opacity-90 rounded-lg shadow-lg p-6 md:p-8 w-full max-w-md mx-auto relative z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-center text-white dark:text-orange-500">
          Sign Up
        </h2>
        <form className="space-y-3" onSubmit={registerUser}>
          {error && (
            <p className="text-white dark:text-white bg-red-500 p-1 text-center">
              {error}
            </p>
          )}
          <div className="flex items-center border-b border-gray-300 py-2 dark:border-gray-600">
            <FaUser className="text-orange-500 dark:text-white mr-3" />
            <input
              type="text"
              placeholder="Enter your full Name"
              name="name"
              value={userData.name}
              onChange={changeInputHandler}
              className="w-full py-2 px-4 bg-transparent focus:outline-none text-white dark:text-white placeholder-gray-700 dark:placeholder-gray-100"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 dark:border-gray-600">
            <FaEnvelope className="text-orange-500 dark:text-white mr-3" />
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={userData.email}
              onChange={changeInputHandler}
              className="w-full py-2 px-4 bg-transparent focus:outline-none text-white dark:text-white placeholder-gray-700 dark:placeholder-gray-100"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 dark:border-gray-600">
            <FaLock className="text-orange-500 dark:text-white mr-3" />
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={userData.password}
              onChange={changeInputHandler}
              className="w-full py-2 px-4 bg-transparent focus:outline-none text-white dark:text-white placeholder-gray-700 dark:placeholder-gray-100"
            />
          </div>
          <div className="flex items-center border-b border-gray-300 py-2 dark:border-gray-600">
            <FaLock className="text-orange-500 dark:text-white mr-3" />
            <input
              type="password"
              placeholder="Confirm your password"
              name="password2"
              value={userData.password2}
              onChange={changeInputHandler}
              className="w-full py-2 px-4 bg-transparent focus:outline-none text-white dark:text-white placeholder-gray-700 dark:placeholder-gray-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded hover:bg-orange-700 transition-colors duration-300"
          >
            Sign Up
          </button>
        </form>
        <small className="block text-center text-white dark:text-white mt-4">
          Already have an account ? <> </>
          <Link to="/login" className="text-orange-500 hover:underline">
            Sign in
          </Link>
        </small>
      </motion.section>
    </div>
  );
};

export default Register;
