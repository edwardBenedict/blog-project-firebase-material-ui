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
    return result;
  }

  function deleteOneBlog(id) {
    const contactRef = firebaseDB.ref("blogs").child(id);
    contactRef.remove();
  }

  function updateBlog(id, data) {
    const contactRef = firebaseDB.ref("blogs").child(id);
    contactRef.update(data);
  }

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
    deleteOneBlog,
    updateBlog,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
}

/*
https://stackoverflow.com/questions/37717602/retrieve-data-from-firebase-database-in-javascript

var uid = user.uid
firebase.database().ref('users/' + uid).on('value', function(snapshot) {
    var first_name = snapshot.val().first_name;
});
*/
/*
https://stackoverflow.com/questions/59283028/get-data-by-id-from-firebase

*/
