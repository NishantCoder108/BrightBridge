import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
      <p> HomePage </p>
      <Link to="/login"> Login Page</Link>
    </div>
  );
};

export default HomePage;
