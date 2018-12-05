import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div>
    <p>Page not Found.</p>
    <Link to="/">Return.</Link>
  </div>
);

export default NotFound;
