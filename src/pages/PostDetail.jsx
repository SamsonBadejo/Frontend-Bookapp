import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSpring, animated } from "@react-spring/web";
import PostAuthor from "../components/PostAuthor";
import Loader from "../components/Loader";
import DeletePost from "./DeletePost";
import { UserContext } from "../context/userContext";
import axios from "axios";

const PostDetail = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: 500,
  });

  const slideIn = useSpring({
    from: { transform: "translate3d(0,-40px,0)" },
    to: { transform: "translate3d(0,0px,0)" },
    delay: 800,
  });

  const { id: postId } = useParams();
  const { currentUser } = useContext(UserContext); // Use context to get current user data
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${postId}`
        );
        setPost(response.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    getPost();
  }, [postId]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-brown-100  dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {error && (
        <p className="text-white dark:text-white bg-red-500 p-1 text-center">
          {error.message || "An error occurred"}
        </p>
      )}
      {post && (
        <section className="post-detail py-12">
          <div className="container mx-auto post-detail_container p-6 md:p-12 bg-brown-200 dark:bg-black rounded-lg shadow-lg max-w-4xl">
            <animated.div style={fadeIn}>
              <div className="post-detail_header flex flex-col md:flex-row justify-between items-center mb-6">
                <PostAuthor
                  authorID={post.creator}
                  createdAt={post.createdAt}
                />
                {currentUser?.user?.id === post.creator && ( // Conditional rendering based on creator ID
                  <div className="post-detail_button flex space-x-4 mt-4 md:mt-0">
                    <Link to={`/posts/${postId}/edit`} className="btn primary">
                      <motion.button
                        className="px-4 py-2 bg-orange-800 text-white rounded-lg shadow-md hover:bg-orange-900"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        Edit
                      </motion.button>
                    </Link>
                    <DeletePost postId={postId} />
                  </div>
                )}
              </div>
            </animated.div>
            <animated.h1
              style={slideIn}
              className="text-3xl md:text-4xl font-bold mb-6 text-center
              text-brown-900 dark:text-orange-400"
            >
              {post.title}
            </animated.h1>
            <motion.div
              className="post-detail_thumbnail mb-6 overflow-hidden rounded-lg shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <img
                src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`}
                alt="Post Thumbnail"
                className="w-full h-auto"
              />
            </motion.div>
            <animated.div style={fadeIn}>
              <div className="prose dark:prose-dark max-w-none">
                <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
              </div>
            </animated.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default PostDetail;
