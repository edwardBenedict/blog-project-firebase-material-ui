import React, { useContext, useState, useEffect } from "react";
import { firebaseDB } from "../helpers/firebase";

const BlogContext = React.createContext();

export function useBlog() {
  return useContext(BlogContext);
}

export function BlogProvider({ children }) {
  const [currentBlogs, setCurrentBlogs] = useState();

  function addBlog(blogValue) {
    const blogRef = firebaseDB.ref("blogs");
    blogRef.push(blogValue);
  }

  function getOneBlog(id) {
    const result = currentBlogs?.filter((item) => item.id === id);
    // console.log(result);
    return result;
    // setDetailBlog(result);
  }

  // useEffect(() => {
  //   getOneBlog(id);
  // }, [id]);

  useEffect(() => {
    const blogRef = firebaseDB.ref("blogs");
    blogRef.on("value", (snapshot) => {
      //   console.log(snapshot.val());
      const blogs = snapshot.val();
      const blogL = [];
      for (let id in blogs) {
        blogL.push({ id, ...blogs[id] });
      }
      //   console.log(blogL);
      setCurrentBlogs(blogL);
    });
  }, []);

  const value = {
    addBlog,
    currentBlogs,
    getOneBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}
