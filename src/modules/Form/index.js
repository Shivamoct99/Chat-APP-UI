import { useState } from "react";
import Inputs from "../../Helpers/inputs";
import Buttons from "../../Helpers/Buttons";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/context";
import Compressor from "../../Helpers/Compressor";
import uploadfile from "../../Helpers/Uploadfile";

const Form = ({ isSignIn = false }) => {
  let { setUserDetail, API } = useAppContext();
  const [data, setData] = useState({
    ...(!isSignIn && { name: "" }),
    email: "",
    password: "",
    ...(!isSignIn && { profile_pic: "" }),
  });
  const [uploadPhoto, setUploadPhoto] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const fetchUser = async () => {
    // console.log(data);
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
        localStorage.setItem("userToken:", resData.token);
        localStorage.setItem("userDetail:", JSON.stringify(resData.user));
        setUserDetail(JSON.parse(localStorage.getItem("userDetail:")));
        navigate("/");
      }
    }
  };
  // const uploadfile = async (file) => {
  //   if (file.type === "image/jpeg" || file.type === "image/png") {
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("upload_preset", "chat-app");
  //     formData.append("cloud_name", "lostcoder");
  //     await fetch(`https://api.cloudinary.com/v1_1/lostcoder/image/upload`, {
  //       method: "POST",
  //       body: formData,
  //     })
  //       .then((res) => res.json())
  //       .then(async (pic) => {
  //         let url = await pic.url.toString();
  //         setData({ ...data, profile_pic: url });
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   } else {
  //     alert("please selected a jpge or png photo  ");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchUser();
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
  return (
    <div className="bg-[#edf3fc] h-screen flex justify-center items-center">
      <div className="bg-white w-[500px] h-[600px] shadow-lg rounded-lg flex flex-col justify-center items-center">
        <div className="text-4xl font-semibold uppercase mb-4  ">Welcome</div>
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="w-[100%] flex flex-col justify-center items-center">
            <div className="text-xl font-bold mb-4  ">
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
              className="w-80"
              value={data.password}
              onchange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            />
            {!isSignIn && (
              <Inputs
                label="Profile"
                type="file"
                name="profile_pic"
                inputClassName="mb-10 hidden"
                className="w-80 mb-8 relative bottom-[16px] "
                fileName={uploadPhoto?.name}
                onclick={(e) => {
                  handleFileDelete(e);
                }}
                onchange={(e) => {
                  handleUploadPhoto(e);
                  // setData({ ...data, password: e.target.value });
                }}
              />
            )}
            <Buttons
              label={isSignIn ? "Sign In" : " Sign Up"}
              type="submit"
              className="w-80 mb-4"
              isLoading={isLoading}
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
