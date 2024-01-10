import React from "react";
import { Link, useRouteError } from "react-router-dom";
const ProductError = () => {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Error
          </p>

          <p className="mt-4 text-gray-500">{error.message}</p>

          <Link
            to="/products"
            className="mt-6 inline-block rounded bg-main-color px-5 py-3 text-sm font-medium text-white hover:bg-[#50a84c] focus:outline-none focus:ring"
          >
            Go Back products page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductError;
