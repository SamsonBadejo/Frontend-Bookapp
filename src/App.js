import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserProfile from "./pages/UserProfile";
import Authors from "./pages/Authors";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Logout from "./pages/Logout";
import CategoryPosts from "./pages/CategoryPosts";
import AuthorPosts from "./pages/AuthorPosts";
import Dashboard from "./pages/Dashboard";
import ErrorPage from "./pages/ErrorPage";
import DeletePost from "./pages/DeletePost";
import About from "./pages/About"; // Added import
import ContactUs from "./pages/ContactUs"; // Added import
import UserProvider from "./context/userContext"; // Corrected import case

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="posts/:id" element={<PostDetail />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="authors" element={<Authors />} />
          <Route path="create" element={<CreatePost />} />
          <Route
            path="posts/categories/:category"
            element={<CategoryPosts />}
          />
          <Route path="posts/users/:id" element={<AuthorPosts />} />
          <Route path="myposts/:id" element={<Dashboard />} />
          <Route path="posts/:id/edit" element={<EditPost />} />
          <Route path="posts/:id/delete" element={<DeletePost />} />
          <Route path="logout" element={<Logout />} />
          <Route path="about" element={<About />} /> {/* Added route */}
          <Route path="contact" element={<ContactUs />} /> {/* Added route */}
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </UserProvider>
  );
};

export default App;
