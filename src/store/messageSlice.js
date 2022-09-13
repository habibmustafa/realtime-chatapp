const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   messages: [],
   connectionId: "",
   image: "",
};

const messageSlice = createSlice({
   name: "message",
   initialState,
   reducers: {
      setMessages: (state, action) => {
         state.messages = action.payload;
      },
      setConnectionId: (state, action) => {
         state.connectionId = action.payload;
      },
      setImage: (state, action) => {
         state.image = action.payload;
      },
   },
});

export const { setMessages, setConnectionId, setImage } = messageSlice.actions;
export default messageSlice.reducer;
