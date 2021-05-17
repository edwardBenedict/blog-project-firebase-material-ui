import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { makeStyles } from "@material-ui/core/styles";
import BlogForm from "../components/BlogForm";

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

  return (
    <div>
      <BlogForm newBlog={newBlog} setNewBlog={setNewBlog} />
    </div>
  );
};

export default NewBlog;
