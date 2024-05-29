import { useState } from "react";
import Inputs from "../../Helpers/inputs";
import Buttons from "../../Helpers/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/context";

const Form = ({ isSignIn = false }) => {
  let { setUserDetail, API } = useAppContext();
  const [data, setData] = useState({
    ...(!isSignIn && { name: "" }),
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API}api/${isSignIn ? "login" : "register"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 400) {
      alert("User email or password is incorrect");
    } else if (res.status === 201) {
      navigate("/user/Sign-in");
    } else {
      const resData = await res.json();
      if (resData.token) {
        localStorage.setItem("user:token", resData.token);
        localStorage.setItem("userDetail:detail", JSON.stringify(resData.user));
        setUserDetail(JSON.parse(localStorage.getItem("userDetail:detail")));
        navigate("/");
      }
    }
  };
  return (
    <div className="bg-[#edf3fc] h-screen flex justify-center items-center">
      <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-semibold uppercase mb-4  ">Welcome</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
            // alert("submited");
          }}
        >
          <div className="w-[100%] flex flex-col justify-center items-center">
            <div className="text-xl font-bold mb-10  ">
              {isSignIn
                ? "Sign In To Get Explore"
                : "Sign Up Now To Get Started"}
            </div>
            {!isSignIn && (
              <Inputs
                label="Full Name"
                name="name"
                placeholder="Enter Your Name"
                className="w-80"
                value={data.name}
                onchange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
            )}
            <Inputs
              label="Email"
              type="email"
              name="email"
              placeholder="Enter Your Email"
              className="w-80"
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
              className="w-80"
              value={data.password}
              onchange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <Buttons
              label={isSignIn ? "Sign In" : " Sign Up"}
              type="submit"
              className="w-80 mb-4"
            />
            <div>
              {isSignIn
                ? "Didn't have an account ?"
                : " Alredy have an account ?"}
              <Link
                to={isSignIn ? "/user/Sign-up" : "/user/Sign-in"}
                className="text-primary cursor-pointer underline"
              >
                {isSignIn ? "Sign Up" : " Sign In"}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
