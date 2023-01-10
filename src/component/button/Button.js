import React from "react";

const Button = ({
  onClick,
  className = '',
  full = false,
  type = "button",
  children,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`capitalize text-center mt-auto ${
        full ? "w-full" : ""
      }  px-3 py-3 rounded-lg bg-red-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
