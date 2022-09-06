const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   show: false,
   viewProfile: false
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
      }
   },
});

export const { setShow, setViewProfile } = animSlice.actions;
export default animSlice.reducer;
