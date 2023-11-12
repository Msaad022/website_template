import React from "react";
import { Link, useRouteError } from "react-router-dom";
const ProductError = () => {
  const error = useRouteError();
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <Link to="/">Back to the Products page</Link>
    </div>
  );
};

export default ProductError;
