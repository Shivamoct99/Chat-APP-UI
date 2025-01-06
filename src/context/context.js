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
  userDetail: JSON.parse(localStorage.getItem("userDetail:")) || null,
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
  //   SendOtp
  const SendOtp = async (email) => {
    try {
      const res = await fetch(`${API}api/sendOtp `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const resData = await res.json();
      if (res.status === 200) {
        return "Ok";
      } else {
        return resData.message;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //   VerifyOtp
  const VerifyOtp = async (email, otp) => {
    try {
      const res = await fetch(`${API}api/verifyOtp `, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const resData = await res.json();
      if (res.status === 200) {
        return "Verified";
      } else {
        return resData.message;
      }
    } catch (error) {
      console.log(error);
    }
  };
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
  // Action to reset the state
  const resetForm = () => dispatch({ type: "RESET", payload: initialState });

  useEffect(() => {
    const user = state.userDetail;
    if (user) {
      setMessage();
      fetchConversation(user);
      setSocket(SocketAPI);
    }
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
        resetForm,
        fetchUsers,
        fetchMessages,
        SendOtp,
        VerifyOtp,
        setUserDetail,
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
