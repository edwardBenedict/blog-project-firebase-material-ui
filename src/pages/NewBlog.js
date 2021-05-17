import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import BlogForm from "../components/BlogForm";
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

  const newBlogHandler = (e) => {
    e.preventDefault();
    addBlog(newBlog);
    console.log(newBlog);
  };

  console.log("currentBlogs", currentBlogs);

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
