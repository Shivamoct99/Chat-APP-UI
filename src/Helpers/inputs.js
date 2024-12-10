import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const Inputs = ({
  label = "",
  name = "",
  type = "text",
  value = "",
  fileName = "",
  inputClassName = "",
  className = "",
  isRequired = type === "file" ? false : true,
  placeholder = "",
  onchange = "",
  onclick = "",
}) => {
  const [showPasssword, setShowPassword] = useState(false);
  // console.log(onclick);
  return (
    <div className={`  ${className} min-w-50`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">
        {label}
        {type === "file" && (
          <div className="h-14 bg-slate-200 px-6 flex justify-center items-center border rounded hover:border-black cursor-pointer">
            <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
              {fileName ? fileName : "Upload Profile Photo"}
            </p>
            {fileName && (
              <button
                className="text-lg ml-2 hover:text-red-600"
                onClick={onclick}
              >
                <IoMdClose />
              </button>
            )}
          </div>
        )}
      </label>

      <input
        type={showPasssword ? "text" : type}
        id={name}
        // name={name}
        accept={type === "file" && "image/png, image/gif, image/jpeg"}
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
    </div>
  );
};

export default Inputs;
