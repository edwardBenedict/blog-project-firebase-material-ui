import React from "react";
import { useBlog } from "../contexts/BlogContext";

const Details = ({ match }) => {
  const { getOneBlog } = useBlog();

  const result = getOneBlog(match.params.id);
  console.log({ result });

  return (
    <div>
      <h3>Details</h3>
      <h3>{match.params.id}</h3>
    </div>
  );
};

export default Details;
