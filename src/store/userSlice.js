import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   user: false,
   allUsers: false,
   chatUserId: false,
   chatUser: false,
   recentUsers: []
};

export const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.user = action.payload;
      },
      setAllUsers: (state, action) => {
         state.allUsers = action.payload;
      },
      setChatUserId: (state, action) => {
         state.chatUserId = action.payload;
      },
      setChatUser: (state, action) => {
         state.chatUser = action.payload;
      },
      setRecentUsers: (state, action) => {
         state.recentUsers = action.payload;
      },
   },
});

export const { setUser, setAllUsers, setChatUser, setChatUserId, setRecentUsers } =
   userSlice.actions;
export default userSlice.reducer;
