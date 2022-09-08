import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store";
import "remixicon/fonts/remixicon.css";

const App = () => {
   useEffect(() => {
      if (localStorage.theme === "dark") {
         document.querySelector("html").classList.add("dark");
      } else if (localStorage.theme === "light") {
         document.querySelector("html").classList.remove("dark");
      } else {
         localStorage.setItem("theme", "light");
      }
   }, []);

   return (
      <Provider store={store}>
         <BrowserRouter>
            <Toaster position="top-center" />
            <Routing />
         </BrowserRouter>
      </Provider>
   );
};

export default App;
