import React from "react";
import { Routes, Route } from "react-router-dom";
import SetAvatar from "../pages/SetAvatar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const Routing = () => {
   return (
      <>
         <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/setAvatar" element={<SetAvatar />} />
         </Routes>
      </>
   );
};

export default Routing;
