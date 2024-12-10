import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpeg";
import Inputs from "../Helpers/inputs";
import { useAppContext } from "../context/context";
import { IoArrowBackSharp } from "react-icons/io5";
import Compressor from "../Helpers/Compressor";
import Uploadfile from "../Helpers/Uploadfile";
// import Buttons from "../Helpers/Buttons";

const ConvesationBox = () => {
  const {
    userDetail,
    message,
    messageInput,
    setMessageInput,
    setMessageImageInput,
    sendMessage,
    setconversations,
  } = useAppContext();
  const [barOpen, setbarOpen] = useState(false);
  const messageRef = useRef();

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message?.messages]);

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      const compressedFile = await Compressor(file);
      // setUploadPhoto(compressedFile);
      const fileUrl = await Uploadfile(compressedFile);
      // console.log(fileUrl);
      setMessageImageInput(fileUrl);
      // setIsLoading(false);
    }
  };
  return (
    <div className="w-[100%] h-screen bg-gary flex flex-col items-center  ">
      {message?.receiver?.name && (
        <div className="w-full flex flex-row items-center justify-evenly">
          {/*  Back Arrow */}
          <div
            className=" mt2 bg-secondary rounded-full hidden sm:block"
            onClick={() => {
              setconversations();
            }}
          >
            <IoArrowBackSharp size={40} />
          </div>
          {/* receiver info box */}
          <div className="w-[75%] bg-secondary h-[60px] mt-4 mb-4 rounded-full flex items-center px-14 sm:w-[90%]">
            {/* receiver img */}
            <div className="cursor-pointer">
              <img
                src={message.receiver.profile_pic || logo}
                alt=""
                className="w-12 h-12 rounded-full"
              />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-lg capitalize font-semibold">
                {message.receiver.name}
              </h3>
              <p className="text-sm font-light text-gray-600">
                {message.receiver.email}
              </p>
            </div>
            {/* video icon */}
            <div className="cursor-pointer flex gap-6 ">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-video-plus"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                  <path d="M3 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                  <path d="M7 12l4 0" />
                  <path d="M9 10l0 4" />
                </svg>
              </div>
              {/* calling icon */}
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-phone"
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="h-[75%] w-full overflow-y-scroll shadow-sm">
        <div className=" p-6">
          {message?.messages?.length > 0 ? (
            message.messages.map(({ message, user: { id } }) => {
              return (
                <>
                  <div
                    className={` max-w-fit rounded-b-xl p-4 mb-4 break-words  ${
                      id === userDetail._id
                        ? " bg-primary rounded-tl-xl ml-auto text-white  "
                        : "bg-secondary rounded-tr-xl"
                    }`}
                  >
                    {message.startsWith("http://") ? (
                      <img src={message} alt="message" className="w-48 h-48" />
                    ) : (
                      message
                    )}
                  </div>
                  <div ref={messageRef}></div>
                </>
              );
            })
          ) : (
            <div className="w-full h-[100px] flex items-center justify-center">
              <h3 className="text-2xl font-semibold">
                No Message Or No Conversation Selected, <br />
                Please Select a Conversation
              </h3>
            </div>
          )}
        </div>
      </div>
      {/* input to type message */}
      {message?.receiver?.name && (
        <div className="px-6  w-full flex items-center p-4 bg-secondary">
          {/*  */}
          <div className={` w-[80%]  min-w-50`}>
            <textarea
              // name={name}
              rows={1}
              // max-rows="4"
              // cols={5}
              value={messageInput}
              // value=
              className={`  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full capitalize  p-2 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none resize-none`}
              placeholder="type a message"
              onChange={(e) => setMessageInput(e)}
              // required={isRequired}
            />
          </div>
          {/* send icon */}
          <div
            className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
              !messageInput && "pointer-events-none"
            } `}
            onClick={() => sendMessage()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-send"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 14l11 -11" />
              <path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" />
            </svg>
          </div>
          <span
            className={` absolute right-[72px] bottom-[100px] min-h-2 min-w-3 p-6 rounded bg-slate-300 sm:left-auto sm:right-[62px] sm:bottom-[58px] ${
              barOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col gap-2">
              <span className="w-30  relative ">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-800 cursor-pointer"
                >
                  Image
                </label>
                <input
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  id="image"
                  className={` mb-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 hidden `}
                  onChange={handleUploadPhoto}
                />
              </span>
              <li>Document</li>
              <li>Document</li>
              <li>Document</li>
            </ul>
          </span>
          {/* adding icon*/}
          <div
            className={`ml-4 p-2 cursor-pointer bg-light rounded-full 
            `}
            onClick={() => {
              setbarOpen(!barOpen);
              // setNav("setting");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-circle-plus"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
              <path d="M9 12h6" />
              <path d="M12 9v6" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvesationBox;
