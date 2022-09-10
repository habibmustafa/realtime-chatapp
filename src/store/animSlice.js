const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   show: false,
   viewProfile: false,
   showEmoji: false,
   reply: false,
};

const animSlice = createSlice({
   name: "anim",
   initialState,
   reducers: {
      setShow: (state, action) => {
         state.show = action.payload;
      },
      setViewProfile: (state, action) => {
         state.viewProfile = action.payload;
      },
      setShowEmoji: (state, action) => {
         state.showEmoji = action.payload;
      },
      setReply: (state, action) => {
         state.reply = action.payload;
      },
   },
});

export const { setShow, setViewProfile, setShowEmoji, setReply } = animSlice.actions;
export default animSlice.reducer;
