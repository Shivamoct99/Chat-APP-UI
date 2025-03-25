import React from "react";
import { useAppContext } from "../context/context";
import logo from "../assets/logo.jpeg";

const Users = ({ data }) => {
  const {
    // isLoading,
    fetchMessages,
    userDetail,
    navbar,
    // conversation,
    // users,
    setconversations,
  } = useAppContext();
  return data.length > 0 ? (
    data.map(({ user, conversationId }) => {
      const { name, _id, profile_pic } = user;
      return (
        <div className={` flex  items-center py-4 border-b border-b-gray-300 ${_id === userDetail?._id && "hidden" }`}>
          <div
            className={`w-full flex cursor-pointer items-center `}
            onClick={() => {
              conversationId
                ? fetchMessages(conversationId, user)
                : fetchMessages("new", user);
              if (window.innerWidth <= "599.9") {
                // navigate(`/conversation`);
                setconversations();
              }
            }}
          >
            <div>
              <img
                src={profile_pic || logo}
                alt={"name"}
                className="w-14 h-14 rounded-full"
              />
            </div>
            <div className="ml-6">
              <h3 className="capitalize text-lg font-semibold">{name}</h3>
            </div>
          </div>
        </div>
      );
    })
  ) : (
    <div className="w-full h-[100px] flex items-center justify-center">
      <h1 className="text-2xl font-semibold">
        {navbar === "chats" ? "No Conversation Found" : "No Peoples Found"}
      </h1>
    </div>
  );
};

export default Users;
