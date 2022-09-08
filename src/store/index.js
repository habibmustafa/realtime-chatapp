import { configureStore } from "@reduxjs/toolkit";
import user from "./userSlice";
import message from "./messageSlice";
import anim from "./animSlice";

export const store = configureStore({
   reducer: {
      user,
      message,
      anim,
   },
});
