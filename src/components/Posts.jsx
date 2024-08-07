import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";
import axios from "axios";
import Loader from "./Loader";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts`
        );
        setPosts(response?.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };
    fetchPosts();
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <section>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
              <PostItem
                key={id}
                postID={id}
                thumbnail={thumbnail}
                category={category}
                title={title}
                description={description}
                authorID={creator}
                createdAt={createdAt}
              />
            )
          )}
        </div>
      ) : (
        <h2 className=" bg-brown-900 dark:bg-gray-900 text-white dark:text-white text-3xl py-[2rem] text-center">
          No posts found...
        </h2>
      )}
    </section>
  );
};

export default Posts;
