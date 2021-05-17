import React, { useContext, useState, useEffect } from "react";
import { firebaseDB } from "../helpers/firebase";

const BlogContext = React.createContext();

export function useBlog() {
  return useContext(BlogContext);
}

export function BlogProvider({ children }) {
  const [currentBlogs, setCurrentBlogs] = useState();
  const [loading, setLoading] = useState(true);

  function addBlog(blogValue) {
    const blogRef = firebaseDB.ref("blogs");
    blogRef.push(blogValue);
  }

  const value = {
    addBlog,
    currentBlogs,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
