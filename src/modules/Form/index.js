import { useState } from "react";
import Inputs from "../../Helpers/inputs";
import Buttons from "../../Helpers/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/context";
import Compressor from "../../Helpers/Compressor";
import uploadfile from "../../Helpers/Uploadfile";
import InlineOTP from "../../Helpers/InlineOTP";

const Form = ({ isSignIn = false }) => {
  let { setUserDetail, API, SendOtp } = useAppContext();
  const [data, setData] = useState({
    ...(!isSignIn && { name: "" }),
    email: "",
    number: "",
    password: "",
    ...(!isSignIn && { profile_pic: "" }),
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpSend, setIsOtpSend] = useState(false);
  const [isVerify, setIsVerify] = useState(false);
  const [e_Verified, setE_Verified] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // Function to reset all states
  const resetStates = () => {
    // setUploadPhoto("");
    setIsLoading(false);
    setIsOtpSend(false);
    setIsVerify(false);
    setE_Verified(false);
    setError("");
  };

  const fetchUser = async () => {
    const res = await fetch(`${API}api/${isSignIn ? "login" : "register"}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (res.status === 200) {
      if (resData.token) {
        localStorage.setItem("userToken:", resData.token);
        localStorage.setItem("userDetail:", JSON.stringify(resData.user));
        setUserDetail(JSON.parse(localStorage.getItem("userDetail:")));
        navigate("/");
      }
    } else if (res.status === 201) {
      alert(resData.message);
      navigate("/user/Sign-in");
    } else {
      alert(resData.message);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSignIn) {
      fetchUser();
    } else if (e_Verified) {
      fetchUser();
    } else {
      alert("email is not veified");
    }
  };
  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const file = e.target.files[0];
    const compressedFile = await Compressor(file);
    setUploadPhoto(compressedFile);
    let picUrl = await uploadfile(compressedFile);
    setData({ ...data, profile_pic: picUrl });
    setIsLoading(false);
  };
  const handleFileDelete = (e) => {
    e.preventDefault();
    setUploadPhoto("");
  };
  const handleBlur = async (e) => {
    e.preventDefault();
    if (!data.email) {
      setError("");
      setIsVerify(false);
      setE_Verified(false);
    } else if (isValidEmail(data.email)) {
      setError("");
      setIsVerify(true);
      setE_Verified(false);
    } else {
      setError("Check Email!");
      setIsVerify(false);
      setE_Verified(false);
    }
  };
  const handleSendOtp = async () => {
    // let verify;
    let res = await SendOtp(data.email ,true);
    if (res === "Ok") {
      setIsOtpSend(true);
    } else {
      setIsOtpSend(false);
      alert(res);
    }
  };
  return (
    <div className="bg-[#f2f3f4] h-screen flex justify-center items-center  ">
      <div className="relative bg-white w-[28rem] h-[38rem] shadow-lg rounded-lg flex flex-col justify-center items-center sm:w-[20rem] sm:h-[36rem]">
        {isOtpSend && !isSignIn && (
          <div className="absolute top-[10rem] left-[28rem] bg-white w-[10rem] h-[16rem] shadow-lg rounded-lg flex flex-col justify-center items-center">
            <div className="text-base font-semibold uppercase text-center ">
              for email verification
            </div>
            <InlineOTP
              email={data.email}
              setIsOtpSend={setIsOtpSend}
              setE_Verified={setE_Verified}
            />
          </div>
        )}
        <div className="text-4xl font-semibold uppercase mb-2 ">Welcome</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="w-[100%] flex flex-col justify-center items-center">
            <div className="text-xl font-bold mb-2  ">
              {isSignIn
                ? "Sign In To Get Explore"
                : "Sign Up Now To Get Started"}
            </div>
            {!isSignIn && (
              <Inputs
                label="Full Name"
                name="name"
                placeholder="Enter Your Name"
                className="w-[20rem] sm:w-[16rem]"
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
              className="w-[20rem] sm:w-[16rem] relative"
              value={data.email}
              onBlur={!isSignIn && handleBlur}
              isVerify={isVerify}
              e_Verified={e_Verified}
              handleSendOtp={!e_Verified && handleSendOtp}
              onchange={(e) => {
                setData({ ...data, email: e.target.value.toLowerCase() });
              }}
            />
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!isSignIn && (
              <Inputs
                label="Mobile No"
                type="text"
                name="number"
                placeholder="Enter Your Mobile No"
                className="w-[20rem] sm:w-[16rem]"
                value={data.number}
                onchange={(e) => {
                  setData({ ...data, number: e.target.value });
                }}
              />
            )}
            <Inputs
              label="Password"
              type="password"
              name="password"
              placeholder="Enter Your password"
              className="w-[20rem] sm:w-[16rem] relative"
              value={data.password}
              onchange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            <div
              className={` w-[20rem] sm:w-[16rem] text-primary cursor-pointer underline text-right relative bottom-[1rem] ${
                !isSignIn && "hidden"
              } `}
            >
              <Link to="/user/Forgot-Password">Forgot Password ?</Link>
            </div>
            {!isSignIn && (
              <Inputs
                label="Profile"
                type="file"
                id="profile_pic"
                name="profile_pic"
                inputClassName="mb-10 hidden"
                className="w-[20rem] sm:w-[16rem] mt-3  relative bottom-[16px] "
                fileName={uploadPhoto?.name}
                onclick={(e) => {
                  handleFileDelete(e);
                }}
                onchange={(e) => {
                  handleUploadPhoto(e);
                }}
              />
            )}
            <Buttons
              label={isSignIn ? "Sign In" : " Sign Up"}
              type="submit"
              className="w-[20rem] sm:w-[16rem] mb-[1rem]"
              isLoading={isLoading}
            />
            <div>
              {isSignIn
                ? "Didn't have an account ?"
                : " Already have an account ?"}
              <Link
                to={isSignIn ? "/user/Sign-up" : "/user/Sign-in"}
                className="text-primary cursor-pointer underline"
                onClick={resetStates}
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
