import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import { AiOutlineUpload } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Fantasy"); // Default to a valid category
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null); // Preview state
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser?.token) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "color",
  ];

  const POST_CATEGORIES = [
    "Fantasy",
    "Science-Fiction",
    "Romance",
    "Mystery-Thriller",
    "Historical-Fiction",
    "Non-Fiction",
    "Young-Adult",
    "Children's-Books",
    "Anime/Manga",
    "Novels-Comics",
  ];

  const createPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.status === 201) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file)); // Create preview URL
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-brown-100 dark:bg-gray-800">
      <motion.section
        className="bg-brown-900 dark:bg-black dark:text-white rounded-lg shadow-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-white dark:text-orange-500">
          Create a New Post
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={createPost} className="space-y-6">
          <div className="space-y-2">
            <label className="text-lg text-white dark:text-white">Title</label>
            <TextField
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              InputProps={{
                className: "bg-gray-100 dark:bg-white",
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-lg text-white dark:text-white">
              Category
            </label>
            <FormControl fullWidth variant="outlined">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-100 dark:bg-white"
              >
                {POST_CATEGORIES.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="space-y-2">
            <label className="text-lg text-white dark:text-white">
              Description
            </label>
            <div className="rounded mb-8">
              <ReactQuill
                modules={modules}
                formats={formats}
                value={description}
                onChange={setDescription}
                className="custom-quill h-[20rem] text-white mb-20"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              {thumbnailPreview && (
                <div className="mb-4 ">
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
              <input
                type="file"
                onChange={handleThumbnailChange}
                accept="image/png, image/jpeg"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-2 cursor-pointer text-orange-500 hover:text-orange-700"
              >
                <AiOutlineUpload className="text-xl" />
                <span>Upload Thumbnail</span>
              </label>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-orange-500 text-white font-bold rounded-md hover:bg-orange-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Create Post
          </motion.button>
        </form>
      </motion.section>
    </div>
  );
};

export default CreatePost;
