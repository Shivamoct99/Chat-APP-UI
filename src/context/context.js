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
  selectedConversation:{},
  notification:[]
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
      console.log(resData)
      dispatch({ type: "SET_USERS_DATA", payload: resData });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  //   Fetch messages
  const fetchMessages = async (conversationId, user) => {
    // console.log("user : ",user)
    try {
      const res = await fetch(
        `${API}api/message/${conversationId}?senderId=${conversationId==="new" && state.userDetail._id}&&receiverId=${conversationId==="new" && user._id} `,
        {
          method: "Get",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const resData = await res.json();
      let resDataLength = resData.data.length ;
      console.log("fetchResponse",resData.data);
      if(conversationId==="new"){
        user = [state.userDetail,user]
        if (resDataLength  === 0) {
          dispatch({
            type: "SET_MESSAGE_DATA",
            payload: { resData, conversationId, user },
          });    
        }else {
          let conversation=resData.data[0].conversationId
          conversationId=conversation._id
          setSelectedConversation(conversation)
          setNavbar("chats")
          dispatch({
            type: "SET_MESSAGE_DATA",
            payload: { resData, conversationId, user },
          });    
          state.socket?.emit("join chat",conversationId)
        }
      }
      dispatch({
        type: "SET_MESSAGE_DATA",
        payload: { resData, conversationId, user },
      });
      state.socket?.emit("join chat",conversationId)

    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };
  //   send Message
  const sendMessage = async () => {
    const { message, userDetail, messageInput, socket } = state;
    const {
      conversationId ,
      receiver,
    } = message;
    const { _id } = userDetail;
    // let receiverId=receiver.filter((user)=>user._id !== _id  ).map((user)=>console.log("user :" ,user))
    let receiverId=receiver.filter((user)=>user._id !== _id  ).map((user)=>user._id)
    // console.log(_id)

    const res = await fetch(`${API}api/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        conversationId: conversationId,
        senderId: _id,
        message: messageInput,
        receiverId: receiverId,
      }),
    });
    let resData=await res.json()
    // console.log(resData)
    dispatch({ type: "SET_MESSAGE_INPUT", payload: "" });
    // console.log("send messsage",resData)
    socket?.emit("sendMessage", resData.data );
    setSocketMessage(resData.data)
  };
  // Delete Message 
  const deleteMessage = async (messageId) => {
    const { message:{messages} } = state;
    const res = await fetch(`${API}api/message/delete`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messageIds: [messageId],
      }),
    });
    let resData=await res.json()
    if (res.status===200) {
      let updatedMessage=messages.filter(message=>message._id!==messageId)
      setSocketMessage(updatedMessage)
    }else{
      alert(resData.message)
    }
    // socket?.emit("sendMessage", resData.data );
  };

  //   SendOtp
  const SendOtp = async (email,verify) => {
    console.log(email,verify);
    try {
      const res = await fetch(`${API}api/sendOtp `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email,verify }),
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

  // set selectedConversation
  const setSelectedConversation = (conversation) => {
    dispatch({ type: "SET_SELECTED_CONVERSATION", payload: conversation });
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
  // set notificatoion
  const setNotification = (value) => {
    dispatch({ type: "SET_NOTIFICATION", payload: value });
  };
  // set SocketMessage
  const setSocketMessage = (msg) => {
    dispatch({ type: "SET_SOCKET_MESSAGE", payload: msg });
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
    const { socket, userDetail} = state;
    socket?.emit("addUser", userDetail?._id);
    socket?.on("connected",()=>console.log("connected"))
    // socket?.on("getUsers", (Users) => console.log("activeUsers=>", Users));
      //   socket?.on("getMessage", (data) => {
        //     console.log(selectedConversation , data?.conversationId?._id)
        //     // if (state.selectedConversation?._id === data?.conversationId?._id) {
          //     //   console.log("get Message inside if :",data)
          //     // }
          //     console.log("get Message :",data)
          //     setSocketMessage(data);
          //  });
        },[state.socket]);
  useEffect(()=>{
    const { socket,selectedConversation } = state;
    let handleMessage=(data) => {
     if (selectedConversation?._id !== data?.conversationId?._id ) {
       setNotification(data);
     }else{
       setSocketMessage(data);
       }
     }
  socket?.on("getMessage",handleMessage);
      return ()=>{socket?.off("getMessage",handleMessage);}
    },[state.socket,state.selectedConversation])
  return (
    <myContest.Provider
      value={{
        ...state,
        API,
        resetForm,
        fetchUsers,
      fetchConversation,
        fetchMessages,
        sendMessage,
        deleteMessage,
        SendOtp,
        VerifyOtp,
        setUserDetail,
        setMessageInput,
        setMessageImageInput,
        setNavbar,
        setconversations,
        setSelectedConversation
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
