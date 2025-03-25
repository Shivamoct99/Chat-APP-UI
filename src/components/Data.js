import React from "react";
import logo from "../assets/logo.jpeg";
import { useAppContext } from "../context/context";
import Users from "./Users";
// import { useNavigate } from "react-router-dom";

const Data = () => {
  const {
    isLoading,
    fetchMessages,
    userDetail,
    navbar,
    conversation,
    users,
    notification,
    setconversations,
    selectedConversation,
    setSelectedConversation,
  } = useAppContext();
  // const navigate = useNavigate();
  let handleClick = (e, conversations, conversationId, members) => {
    setSelectedConversation(conversations);
    fetchMessages(conversationId, members);
  };
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
  if (isLoading) {
    return <div> ......Loading </div>;
  }
  return (
    <div className="h-[80%] ">
      <div className=" h-[6%] text-primary text-lg mx-4 ">
        {navbar === "chats" ? "Messages" : "Peoples"}
      </div>
      <div className="h-[94%] mx-4 overflow-y-scroll  ">
        {navbar === "users" ? (
          <Users data={data} />
        ) : data.length > 0 ? (
          // data.map(({ members, _id: conversationId, isGroupConversation }) => {
          data.map((conversations) => {
            const {
              conversationName,
              // groupAdmin,
              _id: conversationId,
              members,
              latestMessages,
              isGroupConversation,
            } = conversations;
            return isGroupConversation ? (
              <div className=" flex  items-center py-2 border-b border-b-gray-300  ">
                <div
                  className={`w-full flex cursor-pointer items-center p-[.5rem] hover:bg-gray-200 rounded-[1rem] ${
                    selectedConversation._id === conversationId ||
                    notification?.filter(
                      (n) => n.conversationId._id === conversationId
                    ).length > 0 ?
                      "bg-gray-200":""
                  }`}
                  onClick={(e) => {
                    handleClick(e, conversations, conversationId, members);
                    if (window.innerWidth <= "599.9") {
                      setconversations();
                    }
                  }}
                >
                  <img
                    src={logo}
                    alt={conversationName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-6 flex-1">
                    <h3 className="capitalize text-[1rem] font-semibold ">
                      {conversationName}
                    </h3>
                    <p className="text-sm font-light text-gray-600">
                      {latestMessages?.message?.length > 10
                        ? `${latestMessages?.message?.substring(0, 10)}.....`
                        : latestMessages?.message}
                      {/* {email.length > 10
                      ? `${email.substring(0, 15)}....`
                      : email} */}
                    </p>
                  </div>
                  <span
                    className={`bg-gray-400 rounded-full ml-auto p-1 mr-1 ${
                      notification?.filter(
                        (n) => n.conversationId._id === conversationId
                      ).length > 0
                        ? ""
                        : "hidden"
                    }`}
                  >
                    {
                      notification?.filter(
                        (n) => n.conversationId._id === conversationId
                      ).length
                    }
                  </span>
                </div>
              </div>
            ) : (
              members?.map((user) => {
                const { name, _id, profile_pic } = user;
                if (_id !== userDetail._id) {
                  return (
                    <div className=" flex  items-center py-2 border-b border-b-gray-300">
                      <div
                        className={`w-full flex cursor-pointer items-center p-[.5rem] hover:bg-gray-200 rounded-[1rem] ${
                          selectedConversation._id === conversationId ||
                            notification?.filter(
                            (n) => n.conversationId._id === conversationId
                          ).length > 0
                           ?
                            "bg-gray-200":""
                        }`}
                        onClick={(e) => {
                          conversationId
                            ? handleClick(
                                e,
                                conversations,
                                conversationId,
                                members
                              )
                            : // fetchMessages(conversationId,members)
                              fetchMessages("new", members);
                          if (window.innerWidth <= "599.9") {
                            // navigate(`/conversation`);
                            setconversations();
                          }
                        }}
                      >
                        <img
                          src={profile_pic || logo}
                          alt={"name"}
                          className="w-10 h-10 rounded-full"
                        />
                        <div className="ml-6">
                          <h3 className="capitalize text-[1rem] font-semibold">
                            {name}
                          </h3>
                          <p className="text-sm font-light text-gray-600">
                            {latestMessages?.message?.length > 10
                              ? `${latestMessages?.message?.substring(
                                  0,
                                  10
                                )}.....`
                              : latestMessages?.message}
                          </p>
                        </div>
                        <span
                          className={`bg-gray-400 rounded-full ml-auto p-1 mr-1 ${
                            notification?.filter(
                              (n) => n.conversationId._id === conversationId
                            ).length > 0
                              ? ""
                              : "hidden"
                          }`}
                        >
                          {
                            notification?.filter(
                              (n) => n?.conversationId?._id === conversationId
                            ).length
                          }
                        </span>
                      </div>
                    </div>
                  );
                }
              })
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
