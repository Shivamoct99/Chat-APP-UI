import React, { useState } from "react";
import { useAppContext } from "../context/context";

const InlineOTP = ({ email, setIsOtpSend, setE_Verified }) => {
  let { VerifyOtp } = useAppContext();
  const [otpInput, setOtpInput] = useState("");
  const [error, setError] = useState("");

  const handleVerify = async () => {
    let verify = await VerifyOtp(email, otpInput);
    if (verify === "Verified") {
      setIsOtpSend(false);
      setE_Verified(true);
      console.log("OTP verified");
    } else {
      setError(verify);
      setE_Verified(false);
    }
  };

  return (
    <div style={{ display: "inline-block", textAlign: "center" }}>
      <input
        type="text"
        value={otpInput}
        onChange={(e) => setOtpInput(e.target.value)}
        placeholder="Enter OTP"
        maxLength={6}
        className=" w-full mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 "
        style={{ width: "8rem", padding: "5px", margin: "1rem" }}
      />
      <button
        className="text-white bg-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm min-w-[10%] px-5 py-2.5 text-center "
        onClick={handleVerify}
      >
        Verify
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default InlineOTP;
