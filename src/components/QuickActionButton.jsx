import React from "react";

function QuickActionButton({ icon, text, onClick }) {
  return (
    <button
      className='flex items-center space-x-3 w-full p-4 bg-white rounded-xl border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 text-left group'
      onClick={onClick}
    >
      <div className='w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors'>
        <span className='text-purple-300 text-lg'>{icon}</span>
      </div>
      <span className='text-gray-700 font-medium'>{text}</span>
      <div className='ml-auto text-gray-400 group-hover:text-purple-500 transition-colors'>
        →
      </div>
    </button>
  );
}

export default QuickActionButton;
