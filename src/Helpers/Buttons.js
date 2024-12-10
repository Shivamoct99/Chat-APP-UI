import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Buttons = ({
  label = "button",
  type = "button",
  className = "",
  disabled = false,
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      className={`text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm min-w-[10%] px-5 py-2.5 text-center ${className}`}
      disabled={disabled}
    >
      {isLoading ? <ClipLoader size={20} color={"#fff"} /> : label}
    </button>
  );
};

export default Buttons;
