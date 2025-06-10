import React from "react";

function LoadingMessage() {
  return (
    <div className='flex justify-start mb-4'>
      <div className='max-w-xs lg:max-w-md px-4 py-2 rounded-2xl bg-gray-100'>
        <div className='flex space-x-1'>
          <div className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'></div>
          <div
            className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className='w-2 h-2 bg-gray-400 rounded-full animate-bounce'
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoadingMessage;
