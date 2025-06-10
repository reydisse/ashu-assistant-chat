import React from "react";

function ChatHistoryItem({ chat, isActive, onClick }) {
  return (
    <div
      className={`p-3 mb-2 rounded-lg cursor-pointer transition-all duration-200 ${
        isActive
          ? "bg-purple-50 border-l-4 border-purple-500"
          : "hover:bg-gray-50"
      }`}
      onClick={onClick}
    >
      <div className='flex justify-between items-start mb-1'>
        <h3 className='font-medium text-gray-900 text-sm'>{chat.title}</h3>
        <span className='text-xs text-gray-500'>{chat.date}</span>
      </div>
      <p className='text-xs text-gray-600 leading-relaxed'>{chat.subtitle}</p>
    </div>
  );
}

export default ChatHistoryItem;
