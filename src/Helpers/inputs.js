import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { MdOutlineVerified } from "react-icons/md";

const Inputs = ({
  label = "",
  name = "",
  id = "",
  type = "text",
  value = "",
  readOnly = false,
  fileName = "",
  inputClassName = "",
  className = "",
  isRequired = type === "file" ? false : true,
  placeholder = "",
  onchange = "",
  onclick = "",
  onBlur = "",
  isVerify = false,
  e_Verified = false,
  handleSendOtp = "",
}) => {
  const [showPasssword, setShowPassword] = useState(false);
  const handleBlur = () => {
    // console.log("");
  };
  return (
    <div className={`  ${className} min-w-50`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-800">
        {label}
        {type === "file" && (
          <div className="h-10 bg-slate-200 px-6 flex justify-center items-center border rounded hover:border-black cursor-pointer">
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
        name={name}
        accept={type === "file" && "image/png, image/gif, image/jpeg"}
        value={value}
        readOnly={readOnly}
        className={` mb-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${inputClassName}`}
        placeholder={placeholder}
        required={isRequired}
        onChange={onchange}
        onBlur={onBlur ? onBlur : handleBlur}
      />
      {isVerify && (
        <span
          className={`absolute bottom-[1.2rem] left-[16.5rem] sm:left-[12.5rem] ${
            !e_Verified
              ? "cursor-pointer"
              : "bottom-[1.3rem] left-[20rem] sm:left-[16rem]"
          } `}
          style={{ color: "blue" }}
          onClick={() => !e_Verified && handleSendOtp()}
        >
          {e_Verified ? <MdOutlineVerified /> : "Verify"}
        </span>
      )}
      {type === "password" && (
        <div className="w-fit absolute bottom-[1.5rem] left-[18rem] sm:left-[14rem]">
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
