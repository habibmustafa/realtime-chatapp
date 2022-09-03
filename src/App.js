import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routing from "./config/Routing";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { store } from "./store";
import 'remixicon/fonts/remixicon.css'


const App = () => {
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
