import React from "react";

function Button({ children, onClick, type = "button", disabled, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-[#A0522D] text-white px-5 py-2 rounded-md text-base cursor-pointer transition-colors duration-200
        hover:bg-[#7A4222] disabled:bg-gray-300 disabled:cursor-not-allowed`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
