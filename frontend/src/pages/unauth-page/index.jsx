import React from "react";
import { Link } from "react-router-dom";

function UnauthPage() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-3xl text-gray-700">
        You Don't have access to view this page
      </h1>
      <Link to={'/shop'} className="text-blue-500 text-xl mt-5">Go to the Shop</Link>
    </div>
  );
}

export default UnauthPage;
