import { createContext, useContext, useReducer, useEffect } from "react";
import reducer from "../reducer/Appreducer";
import { io } from "socket.io-client";

const myContest = createContext();
// const API = "http://localhost:8000/";
// const SocketAPI = "http://localhost:8000/";
const API = "https://chat-app-backend-b98d.onrender.com/";
const SocketAPI = "https://chat-app-backend-b98d.onrender.com/";

const initialState = {
  isLoading: false,
  isError: false,
  userDetail: JSON.parse(localStorage.getItem("userDetail:")),
  // token: localStorage.getItem("userToken:"),
  conversation: [],
  message: {},
  messageInput: "",
  users: [],
  socket: null,
  navbar: "chats",
  conversations: false,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  //   set Socket Api
  const setSocket = (Api) => {
    dispatch({ type: "SET_SOCKET", payload: io(Api) });
  };
  //   set LoginUserDetail
  const setUserDetail = (user) => {
    dispatch({ type: "SET_USER_DETAIL", payload: user });
  };
  //   set MessageInput
  const setMessageInput = (e) => {
    let message = e.target.value;
    dispatch({ type: "SET_MESSAGE_INPUT", payload: message });
  };
  //   set MessageImageInput
  const setMessageImageInput = (value) => {
    let message = value;
    dispatch({ type: "SET_MESSAGE_INPUT", payload: message });
  };
  //   set navbar
  const setNavbar = (value) => {
    dispatch({ type: "SET_NAVBAR", payload: value });
  };
  // fetching convesations
  const fetchConversation = async (user) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await fetch(`${API}api/conversation/${user._id}`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      dispatch({ type: "SET_CONVERSATION_DATA", payload: resData });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  //   Fetching Users
  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}api/users`, {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resData = await res.json();
      dispatch({ type: "SET_USERS_DATA", payload: resData });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  //   Fetch messages
  const fetchMessages = async (conversationId, user) => {
    try {
      const res = await fetch(
        `${API}api/message/${conversationId}?senderId=${state.userDetail._id}&&receiverId=${user.userId} `,
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      dispatch({
        type: "SET_MESSAGE_DATA",
        payload: { resData, conversationId, user },
      });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  //   send Message
  const sendMessage = async () => {
    const { message, userDetail, messageInput, socket } = state;
    const {
      conversationId,
      receiver: { userId },
    } = message;
    const { _id } = userDetail;
    socket?.emit("sendMessage", {
      conversationId: conversationId,
      senderId: _id,
      message: messageInput,
      receiverId: userId,
    });
    //const res= await fetch("http://localhost:8000/api/message", {
    await fetch(`${API}api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: conversationId,
        senderId: _id,
        message: state.messageInput,
        receiverId: userId,
      }),
    });
    dispatch({ type: "SET_MESSAGE_INPUT", payload: "" });
  };
  // set SocketMessage
  const setSocketMessage = (data) => {
    dispatch({ type: "SET_SOCKET_MESSAGE", payload: data });
  };
  // set conversations
  const setconversations = () => {
    dispatch({ type: "SET_Conaversations", payload: state.conversations });
  };
  const setMessage = () => {
    dispatch({ type: "SET_Message", payload: {} });
  };

  useEffect(() => {
    setSocket(SocketAPI);
  }, []);
  useEffect(() => {
    const user = state.userDetail;
    setMessage();
    fetchConversation(user);
    fetchUsers();
  }, [state.userDetail]);
  //   for socket connection
  useEffect(() => {
    const { socket, userDetail } = state;
    socket?.emit("addUser", userDetail?._id);
    socket?.on("getUsers", (Users) => console.log("activeUsers=>", Users));
    socket?.on("getMessage", (data) => {
      setSocketMessage(data);
    });
  }, [state.socket]);
  return (
    <myContest.Provider
      value={{
        ...state,
        API,
        setUserDetail,
        fetchMessages,
        setMessageInput,
        setMessageImageInput,
        setNavbar,
        sendMessage,
        setconversations,
      }}
    >
      {children}
    </myContest.Provider>
  );
};
const useAppContext = () => {
  return useContext(myContest);
};

export { useAppContext, AppProvider };
