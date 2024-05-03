import React from "react";

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
  return (
    <div className={`  ${className} min-w-50`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">
        {label}
      </label>
      <input
        type={type}
        id={name}
        value={value}
        className={` mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        onChange={onchange}
      />
    </div>
  );
};

export default Inputs;
