import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";
import { UserContext } from "../context/userContext";
import axios from "axios";

const UserProfile = () => {
  const { currentUser } = useContext(UserContext);

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(""); // Added state for avatar preview
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  // Redirect to login page for any user that is not logged in
  useEffect(() => {
    if (!currentUser?.token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (currentUser?.user?.id) {
      const getUser = async () => {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users/${currentUser.user.id}`,
            {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${currentUser.token}`,
              },
            }
          );
          const { name, email, avatar } = response.data;
          setName(name);
          setEmail(email);
          setAvatar(avatar);
          setAvatarPreview(`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`);
        } catch (error) {
          console.error(
            "Error fetching user data:",
            error.response ? error.response.data : error.message
          );
        }
      };
      getUser();
    }
  }, [currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
      setIsAvatarTouched(true);
    }
  };

  const changeAvatarHandler = async (e) => {
    e.preventDefault();

    setIsAvatarTouched(false);

    if (!avatar) {
      console.error("Avatar is not defined");
      return;
    }

    if (!currentUser?.token) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const postData = new FormData();
      postData.append("avatar", avatar);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );

      setAvatar(response.data.avatar);
      setAvatarPreview(""); // Clear preview after successful upload
    } catch (error) {
      console.error(
        "Error changing avatar:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();

    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        {
          withCredentials: true,
          headers: { Authorization: `Bearer ${currentUser.token}` },
        }
      );
      if (response.status === 200) {
        // Log user out
        navigate("/logout");
      }
    } catch (error) {
      setError(
        error.response ? error.response.data.message : error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-brown-100 dark:bg-gray-900 p-10">
      <motion.section
        className="bg-brown-900 dark:bg-black rounded-lg shadow-lg p-8 w-full max-w-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="profile_container space-y-6">
          <Link
            to={`/myposts/${currentUser?.user?.id}`}
            className="block text-orange-500 hover:text-orange-200 mb-4 "
          >
            My Posts
          </Link>
          <div className="profile_details space-y-6">
            <form onSubmit={changeAvatarHandler}>
              <div className="avatar_wrapper flex flex-col items-center space-y-4">
                <motion.div
                  className="profile_avatar relative w-32 h-32 rounded-full overflow-hidden shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img
                    src={avatarPreview || `${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                  <motion.label
                    onClick={() => setIsAvatarTouched(true)}
                    htmlFor="avatar"
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
                  >
                    <FaEdit className="text-white" />
                    <input
                      type="file"
                      name="avatar"
                      id="avatar"
                      accept="image/png, image/jpg, image/jpeg"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </motion.label>
                </motion.div>
                {isAvatarTouched && (
                  <motion.button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition-colors duration-300 shadow-md"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FaCheck />
                  </motion.button>
                )}
              </div>
            </form>
            <div className="text-center">
              <motion.h2
                className="text-2xl font-bold text-brown-900 dark:text-orange-500"
                initial={{ x: -200 }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                {currentUser?.user?.name}
              </motion.h2>
            </div>
            <form onSubmit={updateUserDetails} className="form space-y-4">
              {error && (
                <motion.p
                  className="text-red-500 text-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {error}
                </motion.p>
              )}
              <motion.input
                type="text"
                placeholder="Full Name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
              <motion.input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <motion.input
                type="password"
                placeholder="Current Password"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              />
              <motion.input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              />
              <motion.input
                type="password"
                placeholder="Confirm New Password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
              <motion.button
                type="submit"
                className="w-full py-2 px-4 bg-orange-800 text-white font-bold rounded hover:bg-orange-900 transition-colors duration-300 shadow-md"
                whileHover={{ scale: 1.05 }}
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                Update
              </motion.button>
            </form>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default UserProfile;
