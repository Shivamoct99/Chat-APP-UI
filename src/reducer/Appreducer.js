const Appreducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };
    case "SET_USER_DETAIL":
      return {
        ...state,
        userDetail: action.payload,
      };
    case "SET_MESSAGE_INPUT":
      return {
        ...state,
        messageInput: action.payload,
      };
    case "SET_NAVBAR":
      return {
        ...state,
        navbar: action.payload,
      };
    case "SET_SOCKET":
      return {
        ...state,
        socket: action.payload,
      };
    case "SET_CONVERSATION_DATA":
      return {
        ...state,
        isLoading: false,
        conversation: action.payload,
      };
    case "SET_USERS_DATA":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_MESSAGE_DATA":
      let { resData, user ,conversationId} = action.payload;
      return {
        ...state,
        // message: { messages: resData.data,  conversationId },
        message: { messages: resData.data, receiver: user, conversationId },
      };
    case "SET_SOCKET_MESSAGE":
      const msg = action.payload;
      // console.log(typeof(msg),msg)
      const { message } = state;
      const { messages } = message;
      return {
        ...state,
        message: {
          ...message,
          // messages: [...messages, { senderId: data.user.id, message: data.message }],
          // messages: [...messages, msg],
          messages: Array.isArray(msg)? msg:[...messages, msg],
        },
      };
    case "SET_Conaversations":
      return {
        ...state,
        conversations: !action.payload,
      };
    case "SET_Message":
      return {
        ...state,
        message: action.payload,
      };
    case "SET_SELECTED_CONVERSATION":
      return {
        ...state,
        selectedConversation: action.payload,
      };
    case "SET_NOTIFICATION":
      const { notification } = state;
      return {
        ...state,
        notification: [...notification , action.payload],
      };
    case "RESET":
      console.log(state, action.payload);
      return action.payload; // Reset to initial state
    default:
      return state;
  }
};

export default Appreducer;
