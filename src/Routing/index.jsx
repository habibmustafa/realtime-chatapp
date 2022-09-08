import React from "react";
import { useRoutes } from "react-router-dom";
import SetAvatar from "../pages/SetAvatar";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "./PrivateRoute";

const Routing = () => {
   const routes = useRoutes([
      {
         path: "/",
         element: (
            <PrivateRoute>
               <Dashboard />
            </PrivateRoute>
         ),
         
         // !children: [
         //    {
         //       path: 'profile',
         //       element: <Profile />
         //    },
         //    {
         //       path: 'chats',
         //       element: <Chats />
         //    },
         //    {
         //       path: 'contacts',
         //       element: <Contacts />
         //    },
         //    {
         //       path: 'settings',
         //       element: <Settings />
         //    },
         // ]
      },
      {
         path: "/login",
         element: <Login />,
      },
      {
         path: "/register",
         element: <Register />,
      },
      {
         path: "/setAvatar",
         element: <SetAvatar />,
      },
   ]);

   return routes;
};

export default Routing;
