const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   messages: [],
   connectionId: '',
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
   },
});

export const { setMessages, setConnectionId } = messageSlice.actions;
export default messageSlice.reducer;
