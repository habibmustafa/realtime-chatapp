const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
   show: false,
};

const animSlice = createSlice({
   name: "anim",
   initialState,
   reducers: {
      setShow: (state, action) => {
         state.show = action.payload;
      }
   },
});

export const { setShow } = animSlice.actions;
export default animSlice.reducer;
