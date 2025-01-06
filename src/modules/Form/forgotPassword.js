import React, { useState, useEffect } from "react";
// import { useState } from "react";
import Inputs from "../../Helpers/inputs";
import Buttons from "../../Helpers/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/context";

const ForgotPassword = () => {
  let { API } = useAppContext();
  const [otp, setOtp] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    number: "",
    otp: "",
    password: "",
    confirm_password: "",
  });
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(50);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      // Start the timer
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setIsRunning(false); // Stop the timer
            return 0;
          }
          // prevSeconds > 0 ? prevSeconds - 1 : setIsRunning(false)
        });
      }, 1000);
    }
    // Cleanup the interval on component unmount or when isRunning changes
    return () => clearInterval(timer);
  }, [isRunning]);

  //   fetch otp api call
  const fetchOtp = async () => {
    const res = await fetch(`${API}api/sendOtp `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const JData = await res.json();
    if (res.status === 200) {
      setOtp(true);
      setIsLoading(false);
      setIsRunning(!isRunning);
      setSeconds(50);
    } else {
      alert(JData.message);
      setIsLoading(false);
    }
  };

  // // // //
  const resetPassword = async () => {
    const res = await fetch(`${API}api/resetPassword `, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const jdata = await res.json();
    if (res.status === 404) {
      setIsLoading(false);
      alert(jdata.message); // Set the fetched message
    } else if (res.status === 200) {
      setOtp(!otp);
      setIsLoading(false);
      alert(jdata.message);
      navigate("/user/Sign-in");
    } else {
      setIsLoading(false);
      alert(jdata.message);
    }
  };

  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    !otp ? fetchOtp() : resetPassword();
  };

  const handlePasswordChange = (e, type) => {
    const value = e.target.value;
    type === "new"
      ? setData({ ...data, password: value })
      : setData({ ...data, confirm_password: value });

    // Check if passwords match when typing in confirmPassword
    if (type === "confirm") {
      setError(
        value && value !== data.password ? "Passwords do not match." : ""
      );
    }
  };

  const validatePassword = (pwd) => {
    const validations = [
      { regex: /.{8,}/, message: "At least 8 characters." },
      { regex: /[A-Z]/, message: "At least one uppercase letter." },
      { regex: /[a-z]/, message: "At least one lowercase letter." },
      { regex: /[0-9]/, message: "At least one number." },
      {
        regex: /[!@#$%^&*(),.?":{}|<>]/,
        message: "At least one special character.",
      },
    ];

    const failedValidation = validations.find((v) => !v.regex.test(pwd));
    return failedValidation && failedValidation.message;
  };

  const handleBlur = () => {
    data.password
      ? setMessage(validatePassword(data.password))
      : setMessage("");
  };

  return (
    <div className="bg-[#f2f3f4] h-screen flex justify-center items-center  ">
      <div className="bg-white w-[28rem] h-[38rem] shadow-lg rounded-lg flex flex-col justify-center items-center sm:w-[20rem] sm:h-[36rem]">
        <div className="text-2xl font-bold uppercase mb-2  ">
          Find Your Account
        </div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="w-[100%] flex flex-col justify-center items-center">
            <div className="text-sm font-semibold mb-2  ">
              Please enter your email address or mobile number <br />
              to search for your account.
            </div>
            <Inputs
              label="Email / Mobile Number"
              type="email"
              name="email"
              placeholder="Enter Your Email / Mobile Number"
              className="w-[20rem] sm:w-[16rem]"
              value={data.email}
              readOnly={otp}
              onchange={(e) => {
                setData({ ...data, email: e.target.value.toLowerCase() });
              }}
            />
            <div
              className={` w-[20rem] sm:w-[16rem] text-primary cursor-pointer underline text-right relative bottom-[1rem] ${
                !otp && "hidden"
              } `}
            >
              {isRunning ? (
                <span>
                  {Math.floor(seconds / 60)}:
                  {String(seconds % 60).padStart(2, "0")}
                </span>
              ) : (
                <Link onClick={fetchOtp}>RESEND OTP</Link>
              )}
            </div>
            {otp && (
              <>
                <Inputs
                  label="OTP"
                  type="text"
                  name="Otp"
                  placeholder="Enter Your OTP"
                  className="w-[20rem] sm:w-[16rem]"
                  value={data.otp}
                  onchange={(e) => {
                    setData({ ...data, otp: e.target.value });
                  }}
                />

                <Inputs
                  label="New Password"
                  type="password"
                  name="New Password"
                  placeholder="Enter Your password"
                  className="w-[20rem] sm:w-[16rem] relative"
                  value={data.password}
                  onchange={(e) => {
                    handlePasswordChange(e, "new");
                    // setData({ ...data, password: e.target.value });
                  }}
                  onBlur={handleBlur} // Trigger validation on blur
                />
                {message && (
                  <p
                    className="relative bottom-[1rem]"
                    style={{ color: "red" }}
                  >
                    {message}
                  </p>
                )}
                <Inputs
                  label="Confirm Password"
                  type="password"
                  name="confirm_password"
                  placeholder="Enter Your password"
                  className="w-[20rem] sm:w-[16rem] relative"
                  value={data.confirm_password}
                  onchange={(e) => {
                    handlePasswordChange(e, "confirm");
                    // setData({ ...data, confirm_password: e.target.value });
                  }}
                />
                {error && (
                  <p
                    className="relative bottom-[1rem]"
                    style={{ color: "red" }}
                  >
                    {error}
                  </p>
                )}
              </>
            )}
            <Buttons
              label={otp ? "Submit" : "SEND OTP..."}
              type="submit"
              className="w-[20rem] sm:w-[16rem] mb-[1rem]"
              disabled={
                !otp ||
                (data.otp &&
                  data.password &&
                  data.confirm_password &&
                  !error &&
                  !message)
                  ? false
                  : true
              }
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
