import React from "react";
import Inputs from "../Helpers/inputs";
import Buttons from "../Helpers/Buttons";

const SignUp = () => {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center">
      <div className="text-xl font-bold mb-10  ">
        Sign Up Now To Get Started
      </div>
      <Inputs label="Full Name" name="name" placeholder="Enter Your Name" />
      <Inputs
        label="Email"
        type="email"
        name="email"
        placeholder="Enter Your Email"
      />
      <Inputs
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Your password"
        inputClassName="mb-10"
      />
      <Buttons label="Sign Up" className="w-80 mb-4" />
      <div>
        Alredy have an account ?{" "}
        <span className="text-primary cursor-pointer underline">Sign in</span>
      </div>
    </div>
  );
};

export default SignUp;
