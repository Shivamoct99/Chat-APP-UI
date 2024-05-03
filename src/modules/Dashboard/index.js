import React, { useEffect, useRef } from "react";
import logo from "../../assets/logo.jpeg";
import Inputs from "../../Helpers/inputs";
import Data from "../../components/Data";
import { useAppContext } from "../../context/context";
import Navbar from "../../components/Navbar";

// const contact = [
//   {
//     name: "shubham",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "kuber",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "dhruv",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "Riya",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "Riya",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "Riddhima",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "Riddhima",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "Riddhima",
//     status: "Available",
//     img: logo,
//   },
//   {
//     name: "Riddhima",
//     status: "Available",
//     img: logo,
//   },
// ];

const Dashboard = () => {
  const { userDetail, message, messageInput, setMessageInput, sendMessage } =
    useAppContext();
  const messageRef = useRef();

  useEffect(() => {
    messageRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [message?.messages]);

  return (
    <div className=" w-screen flex">
      {/* navbar  */}
      <div className="w-[6%] h-screen ">
        {/* <Data data={users}  /> */}
        <Navbar />
      </div>
      <div className="w-[26%] h-screen bg-secondary ">
        <div className="flex justify-center items-center my-6 ">
          <div className="border border-primary p-[2px] rounded-full">
            <img
              src={logo}
              width={50}
              height={50}
              className="rounded-full"
              alt=""
            />
          </div>
          <div className="ml-4 ">
            <h3 className="text-2xl capitalize ">{userDetail.name}</h3>
            <p className="text-lg font-light">My Account </p>
          </div>
        </div>
        <hr />
        <Data />
      </div>
      {/* Message /conversation box */}
      <div className="w-[68%] h-screen bg-secondary flex flex-col items-center ">
        {/* receiver info box */}
        {message?.receiver?.name && (
          <div className="w-[75%] bg-secondary h-[80px] mt-4 rounded-full flex items-center px-14">
            {/* receiver img */}
            <div className="cursor-pointer">
              <img
                src={logo}
                alt=""
                width={50}
                height={50}
                className="rounded-full"
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
        )}
        <div className="h-[75%] w-full overflow-y-scroll shadow-sm">
          <div className=" p-10">
            {
              message?.messages?.length > 0 ? (
                message.messages.map(({ message, user: { id } }) => {
                  return (
                    <>
                      <div
                        className={`max-w-[45%]  rounded-b-xl p-4 mb-6 ${
                          id === userDetail._id
                            ? " bg-primary rounded-tl-xl ml-auto text-white "
                            : "bg-secondary rounded-tr-xl"
                        }`}
                      >
                        {message}
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
              )

              //   <div className="max-w-[45%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
              //   Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
              //   dignissimos maxime laudantium necessitatibus tenetur nulla natus
              //   quaerat odio officiis odit?
              // </div>
              // <div className="max-w-[45%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
              //   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore,
              //   omnis.
              // </div>
            }
          </div>
        </div>
        {/* input to type message */}
        {message?.receiver?.name && (
          <div className="p-7 w-full flex items-center ">
            <Inputs
              placeholder="type a message"
              className="w-[80%] "
              value={messageInput}
              onchange={(e) => setMessageInput(e)}
              inputClassName="capitalize mb-0 p-4 border-0 shadow-md rounded-full bg-light focus:ring-0 focus:border-0 outline-none"
            />
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
            {/* add icon */}
            <div
              className={`ml-4 p-2 cursor-pointer bg-light rounded-full ${
                !messageInput && "pointer-events-none"
              } `}
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
      {/* People section */}
    </div>
  );
};

export default Dashboard;
