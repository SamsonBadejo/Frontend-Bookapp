import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => {
  const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${authorID}`
        );
        // console.log("Author data fetched:", response.data); // Debugging line
        setAuthor(response?.data);
      } catch (error) {
        console.log("Error fetching author:", error);
      }
    };

    getAuthor();
  }, [authorID]);

  const validDate = new Date(createdAt);
  if (isNaN(validDate.getTime())) {
    console.error("Invalid date:", createdAt);
    return null; // or handle invalid date gracefully
  }

  

  return (
    <div className="flex items-center space-x-4 ">
      <Link
        to={`/posts/users/${authorID}`}
        className="flex items-center space-x-4 group"
      >
        <div className="rounded-full overflow-hidden w-14 h-14 transition-transform duration-300 transform group-hover:scale-110">
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`}
            alt="Author Avatar"
            className="object-cover w-full h-full transition-transform duration-300 group-hover:rotate-3"
          />
        </div>
        <div className="text-left">
          <h5 className="font-bold text-2xl text-brown-900 dark:text-white">
            {author?.name}
          </h5>
          <small className="text-brown-500 dark:text-gray-500">
          <ReactTimeAgo date={new Date(createdAt)} locale="en" />
          </small>
        </div>
      </Link>
    </div>
  );
};

export default PostAuthor;
