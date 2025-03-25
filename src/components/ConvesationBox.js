import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.jpeg";
// import Inputs from "../Helpers/inputs";
import { useAppContext } from "../context/context";
import { IoArrowBackSharp } from "react-icons/io5";
// import { BsThreeDotsVertical } from "react-icons/bs";
import Compressor from "../Helpers/Compressor";
import Uploadfile from "../Helpers/Uploadfile";
// import Buttons from "../Helpers/Buttons";

const ConvesationBox = () => {
  const {
    userDetail,
    message,
    messageInput,
    selectedConversation,
    setMessageInput,
    setMessageImageInput,
    sendMessage,
    deleteMessage,
    setconversations,
  } = useAppContext();
  const [barOpen, setbarOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [longPressTimer, setLongPressTimer] = useState(null);
  const menuRef = useRef(null); // Ref to detect outside click
  const messageRef = useRef();

  let ProfilePic,Name;
  if (selectedConversation?.isGroupConversation) {
    Name=selectedConversation.conversationName
  }else{
    Name=message?.receiver?.find(user=>user._id !== userDetail._id)?.name
    ProfilePic=message?.receiver?.find(user=>user._id !== userDetail._id)?.profile_pic;
  }
  // ✅ Show menu at right-click or long-press position
  const openMenu = (event) => {
    event.preventDefault();
    const clickX = event.clientX + 10;
    const clickY = event.clientY ;
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight - 20;
    const menuWidth = 160; // Estimated menu width
    const menuHeight = 130; // Estimated menu height

    let menuX = clickX;
    let menuY = clickY;

    // ✅ Adjust position for RIGHT side overflow
    if (clickX + menuWidth > screenWidth) {
      menuX = clickX - menuWidth; // Show to the left
    }

    // ✅ Adjust position for BOTTOM side overflow
    if (clickY + menuHeight > screenHeight) {
      menuY = clickY - menuHeight; // Show above
    }

    // ✅ Adjust position for TOP side overflow
    if (clickY < menuHeight) {
      menuY = clickY + 10; // Show below if too close to the top
    }

    setMenuPosition({ x: menuX, y: menuY });
    // setMenuPosition({ x: event.clientX, y: event.clientY });
    setShowMenu(true);
  };

  // ✅ Close menu when clicking outside
  const closeMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };
    // ✅ Detect click outside to close menu
    useEffect(() => {
      if (showMenu) {
        document.addEventListener("click", closeMenu);
      }
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message?.messages]);

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    if (file) {
      const compressedFile = await Compressor(file);
      const fileUrl = await Uploadfile(compressedFile);
      setMessageImageInput(fileUrl);
    }
  };
    // ✅ Handle long press for mobile
    const handleTouchStart = (event) => {
      const timer = setTimeout(() => {
        openMenu(event.touches[0]);
      }, 600);
      setLongPressTimer(timer);
    };
  
    const handleTouchEnd = () => clearTimeout(longPressTimer);
    
    const handleDelete= async (e,messageId) => {
      e.preventDefault();
deleteMessage(messageId);
setShowMenu(false)
      // console.log(messageId)

         }
  return (
    <div className="w-[100%] h-screen bg-gary flex flex-col items-center ">
      {message?.receiver && (
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
          <div className="w-[75%] bg-secondary h-[4rem] mt-4 mb-4 rounded-full flex items-center px-8 sm:w-[90%]">
            {/* receiver img */}
            <div className="cursor-pointer">
              <img
                src={ ProfilePic || logo}
                alt=""
                className="w-10 h-10 rounded-full"
              />
            </div>
            <div className="ml-6 mr-auto">
              <h3 className="text-[1.25rem] capitalize font-semibold">
                {Name||"demo"}
              </h3>
              {/* <p className="text-sm font-light text-gray-600">
                {message.receiver.email}
              </p> */}
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
            message.messages.map(( {message,senderId,_id:messageId}) => {
              let pic=selectedConversation?.members?.find(user =>user._id===senderId)?.profile_pic;
              return (
                <>
                <div className={` max-w-fit flex gap-1   ${
                      senderId === userDetail._id
                      ? "  ml-auto flex-row-reverse "
                      : ""
                    }`}
                    // onContextMenu={openMenu}
                    // onTouchStart={handleTouchStart}
                    // onTouchEnd={handleTouchEnd}
                    >
                <img
                src={pic }
                alt=""
                className="w-6 h-6 rounded-full"
              />
              {/* Message  */}
                  <div
                    className={` max-w-fit rounded-b-xl p-2 mb-3 break-words cursor-pointer flex gap-1  ${
                      senderId === userDetail._id
                      ? " bg-primary rounded-tl-xl ml-auto text-white flex-row-reverse  "
                      : "bg-secondary rounded-tr-xl"
                    }`}
                    onContextMenu={openMenu}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  >
                    {/* <div className="cursor-pointer ">
                    <BsThreeDotsVertical />
                    </div> */}
                    {message.startsWith("http://") ? (
                      <img src={message} alt="message" className="w-48 h-48" />
                    ) : (
                      message
                    )}
                  {/* </div> */}
                   {/* ✅ Context Menu */}
      {showMenu && (
        <div
          ref={menuRef}
          className="absolute bg-white text-black border rounded-lg w-40 text-sm z-50 overflow-hidden"
          style={{ top: `${menuPosition.y}px`, left: `${menuPosition.x}px` }} // Dynamic Position
        >
          <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">✏ Edit</button>
          <button
            className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
            onClick={() => navigator.clipboard.writeText(message)}
          >
            📋 Copy
          </button>
          <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left" onClick={(e)=>handleDelete(e,messageId)}>❌ Delete</button>
          <button className="block px-4 py-2 hover:bg-gray-100 w-full text-left">
            🚨 Delete for Everyone
          </button>
        </div>
      )}
                  </div>
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
      {message?.receiver && (
        <div className="px-6  w-full flex items-center p-4 bg-secondary">
          {/*  */}
          <div className={` w-[80%]  min-w-50`}>
            <textarea
              // name={name}
              rows={1}
              // cols={5}
              value={messageInput}
              className={`  border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full capitalize  p-2 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none resize-none`}
              placeholder="type a message"
              onChange={(e) => setMessageInput(e)}
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
          {/* adding icon*/}
          <div
            className={`ml-4 p-2 cursor-pointer bg-light rounded-full relative
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
            <span
              className={` absolute right-[1rem] bottom-[3.4rem] min-h-2 min-w-3 p-6 rounded bg-secondary  sm:bottom-[3.2rem] ${
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
          </div>
        </div>
      )}
    </div>
  );
};

export default ConvesationBox;
