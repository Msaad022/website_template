import React from "react";
import { Link, useRouteError } from "react-router-dom";
const ProductError = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h2>Error</h2>
      <p>{error.message}</p>
      <h1 className="text-3xl font-bold underline">
        <Link to="/products">Back to the Products page</Link>
      </h1>
    </div>
  );
};

export default ProductError;
