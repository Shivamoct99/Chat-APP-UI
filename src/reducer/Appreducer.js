const Appreducer = (state, action) => {
  switch (action.type) {
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
        conversation: action.payload,
      };
    case "SET_USERS_DATA":
      return {
        ...state,
        users: action.payload,
      };
    case "SET_MESSAGE_DATA":
      const { resData, user, conversationId } = action.payload;
      return {
        ...state,
        message: { messages: resData, receiver: user, conversationId },
      };
    case "SET_SOCKET_MESSAGE":
      const data = action.payload;
      const { message } = state;
      const { messages } = message;
      return {
        ...state,
        message: {
          ...message,
          messages: [...messages, { user: data.user, message: data.message }],
        },
      };
    default:
      return state;
  }
};

export default Appreducer;
