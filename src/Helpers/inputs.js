import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Inputs = ({
  label = "",
  name = "",
  type = "text",
  value = "",
  inputClassName = "",
  className = "",
  isRequired = true,
  placeholder = "",
  onchange = "",
}) => {
  const [showPasssword, setShowPassword] = useState(false);
  return (
    <div className={`  ${className} min-w-50`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">
        {label}
      </label>

      <input
        type={showPasssword ? "text" : type}
        id={name}
        value={value}
        className={` mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        onChange={onchange}
      />
      {label === "Password" && (
        <div className="relative bottom-[52px] left-[286px]">
          {showPasssword ? (
            <FaEye onClick={() => setShowPassword(false)} />
          ) : (
            <FaEyeSlash onClick={() => setShowPassword(true)} />
          )}
        </div>
      )}

      {/* <FaEyeSlash /> */}
    </div>
  );
};

export default Inputs;
