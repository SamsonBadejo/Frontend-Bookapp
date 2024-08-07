import React, { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import { AiOutlineUpload } from "react-icons/ai";
import { UserContext } from "../context/userContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previousThumbnail, setPreviousThumbnail] = useState(""); // State for previous thumbnail
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const { currentUser } = useContext(UserContext);

  // REDIRECT TO LOGIN PAGE FOR ANY USER THAT IS NOT LOGGED IN
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
    "Anime-Manga",
    "Novels-Comics",
  ];

  useEffect(() => {
    // fetch post data and set the state
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
        setPreviousThumbnail(response.data.thumbnail); // Set previous thumbnail
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("description", description);
    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        }
      );

      if (response.status === 200) {
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-200 dark:bg-gray-800">
      <motion.section
        className="bg-white dark:bg-black dark:text-white rounded-lg shadow-2xl p-8 w-full max-w-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900 dark:text-white">
          Edit Post
        </h2>
        {error && (
          <p className="text-white dark:text-white bg-red-500 p-1 text-center">
            {error}
          </p>
        )}
        <form onSubmit={editPost} className="space-y-6">
          <div className="space-y-2">
            <InputLabel className="text-lg dark:text-white">Title</InputLabel>
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
            <InputLabel className="text-lg dark:text-white">
              Category
            </InputLabel>
            <FormControl fullWidth variant="outlined">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="bg-gray-100 dark:bg-white"
              >
                {POST_CATEGORIES.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className="space-y-2">
            <InputLabel className="text-lg dark:text-white">
              Description
            </InputLabel>
            <div className="rounded mb-8"> {/* Added margin-bottom */}
              <ReactQuill
                modules={modules}
                formats={formats}
                value={description}
                onChange={setDescription}
                className="h-[auto] dark:bg-white  dark:text-black"
              />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex flex-col items-center">
              {previousThumbnail && (
                <div className="mb-4 my-10">
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${previousThumbnail}`}
                    alt="Previous Thumbnail"
                    className="w-full h-auto rounded"
                  />
                </div>
              )}
              <input
                type="file"
                onChange={(e) => setThumbnail(e.target.files[0])}
                accept="image/png, image/jpeg"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="flex items-center space-x-2 cursor-pointer text-blue-500 hover:text-blue-600"
              >
                <AiOutlineUpload className="text-xl" />
                <span>Upload New Thumbnail</span>
              </label>
            </div>
          </div>
          <motion.button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Update
          </motion.button>
        </form>
      </motion.section>
    </div>
  );
};

export default EditPost;
