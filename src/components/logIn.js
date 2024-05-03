import { useState } from "react";
import Inputs from "../Helpers/inputs";
import Buttons from "../Helpers/Buttons";

const LogIn = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  return (
    <form
      onSubmit={() => {
        alert("submited");
      }}
      className="w-[100%] flex flex-col justify-center items-center"
    >
      <div className="text-xl font-bold mb-10  ">Sign In To Get Explore</div>
      {/* <Inputs label="Full Name" name="name" placeholder="Enter Your Name" /> */}
      <Inputs
        label="Email"
        type="email"
        name="email"
        placeholder="Enter Your Email"
        value={data.email}
        onchange={(e) => {
          setData({ ...data, email: e.target.value });
        }}
      />
      <Inputs
        label="Password"
        type="password"
        name="password"
        placeholder="Enter Your password"
        inputClassName="mb-10"
        value={data.password}
        onchange={(e) => {
          setData({ ...data, password: e.target.value });
        }}
      />
      <Buttons label="Sign In" type="submit" className="w-80 mb-4" />
      <div>
        Didn't have an account ?{" "}
        <span className="text-primary cursor-pointer underline">Sign Up</span>
      </div>
    </form>
  );
};

export default LogIn;
