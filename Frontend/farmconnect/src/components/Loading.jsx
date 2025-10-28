import React from "react";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      <p className="mt-4 text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;
