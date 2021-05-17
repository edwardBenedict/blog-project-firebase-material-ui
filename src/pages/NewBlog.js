import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BlogForm from "../components/BlogForm";
import { useHistory } from "react-router-dom";
import { useBlog } from "../contexts/BlogContext";

const NewBlog = () => {
  const { currentUser } = useAuth();
  const [newBlog, setNewBlog] = useState({
    author: currentUser.email,
    title: "",
    content: "",
    get_comment_count: 0,
    get_like_count: 0,
    image: "",
    published_date: Date.now(),
  });
  const { addBlog, currentBlogs } = useBlog();
  const history = useHistory();

  const newBlogHandler = (e) => {
    e.preventDefault();
    try {
      addBlog(newBlog);
      // console.log(newBlog);
      history.push("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  // console.log("currentBlogs", currentBlogs);

  return (
    <div>
      <BlogForm
        newBlog={newBlog}
        setNewBlog={setNewBlog}
        newBlogHandler={newBlogHandler}
      />
    </div>
  );
};

export default NewBlog;
