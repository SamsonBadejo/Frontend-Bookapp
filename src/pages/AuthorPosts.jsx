import React, { useState, useEffect } from 'react';
import PostItem from '../components/PostItem';
import Loader from '../components/Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const AuthorPosts = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams()

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/users/${id}`
        );
        setPosts(response?.data);
      } catch (error) {
        console.error(error);
      }

      setIsLoading(false);
    };
    fetchPosts();
  }, [id]);
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
        <h2 className=" bg-gray-200 dark:bg-gray-900 text-black dark:text-white text-3xl py-[2rem] text-center">
          No posts found...
        </h2>
      )}
    </section>
  );
};

export default AuthorPosts;
