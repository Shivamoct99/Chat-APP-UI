import React from "react";
import logo from "../assets/logo.jpeg";
import { useAppContext } from "../context/context";

const Data = () => {
  const { fetchMessages, userDetail, navbar, conversation, users } =
    useAppContext();
  let data;
  switch (navbar) {
    case "chats":
      data = conversation;
      break;
    case "users":
      data = users;
      break;
    default:
      data = conversation;
      break;
  }
  return (
    <div className=" overflow-scroll  ">
      <div className="text-primary text-lg mx-4 mt-4">
        {navbar === "chats" ? "Messages" : "Peoples"}
      </div>
      <div className="mx-6  ">
        {data.length > 0 ? (
          data.map(({ user, conversationId }) => {
            const { name, email, userId } = user;
            return (
              <div className=" flex  items-center py-4 border-b border-b-gray-300">
                <div
                  className={`w-full flex cursor-pointer items-center ${
                    userId === userDetail._id ? "pointer-events-none" : ""
                  } `}
                  onClick={() => {
                    conversationId
                      ? fetchMessages(conversationId, user)
                      : fetchMessages("new", user);
                  }}
                >
                  <div>
                    <img
                      src={logo}
                      alt={"name"}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-6">
                    <h3 className="capitalize text-lg font-semibold">{name}</h3>
                    <p className="text-sm font-light text-gray-600">
                      {email.length > 10
                        ? `${email.substring(0, 15)}....`
                        : { email }}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="w-full h-[100px] flex items-center justify-center">
            <h1 className="text-2xl font-semibold">
              {navbar === "chats"
                ? "No Conversation Found"
                : "No Peoples Found"}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Data;
