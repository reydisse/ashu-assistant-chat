import React from "react";

function Message({ text, sender }) {
  return (
    <div
      className={`flex mb-4 ${
        sender === "user" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
          sender === "user"
            ? "bg-purple-600 text-white"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        <p className='text-sm leading-relaxed'>{text}</p>
      </div>
    </div>
  );
}

export default Message;
