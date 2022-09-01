import React from "react";
import { Chats } from "./Chats";
import { useState } from "react";
import { logOut } from "../firebaseCongif/auth";
import Contacts from "./Contacts";

export const SideBar = () => {
   const [button, setButton] = useState({
      item: [
         {
            id: 1,
            name: "ri-user-2-line",
         },
         {
            id: 2,
            name: "ri-message-3-line",
         },
         {
            id: 3,
            name: "ri-group-line",
         },
         {
            id: 4,
            name: "ri-settings-2-line",
         },
      ],
      active: 2,
   });

   const handleClick = async () => {
      await logOut();
   };

   return (
      <div className="sidebar flex h-full tablet:flex-col-reverse tablet:w-full">
         {/* sidemenu */}
         <div className="sidemenu box-shadow relative z-20 max-w-[75px] h-screen flex flex-col justify-between items-center p-4 tablet:max-w-full tablet:p-1 tablet:flex-1 tablet:flex-row">
            {/* logo */}
            <div className="flex items-center gap-1 text-3xl text-[#7269ef] cursor-pointer tablet:hidden">
               <i className="ri-chat-smile-2-fill"></i>
            </div>

            {/* center nav */}
            <div className="flex flex-col gap-2 tablet:gap-0 tablet:flex-row tablet:justify-around tablet:w-full">
               {button.item.map((icon) => (
                  <button
                     key={icon.id}
                     onClick={() => {
                        setButton({ ...button, active: icon.id });
                     }}
                     className={`text-2xl text-[#878a82] px-4 inline-block rounded-lg py-3 cursor-pointer tablet:text-xl tablet:px-3.5 tablet:py-2.5 ${
                        icon.id === button.active &&
                        "bg-[#f7f7ff] !text-[#7269ef]"
                     }`}
                  >
                     <i className={icon.name}></i>
                  </button>
               ))}
               <button
                  onClick={handleClick}
                  className="text-2xl opacity-50 px-4 inline-block rounded-lg py-2 cursor-pointer tablet:text-xl tablet:px-3.5 tablet:py-2.5"
               >
                  <i className="ri-logout-box-line"></i>
               </button>
            </div>

            {/* bottom nav */}
            <button
               to="/login"
               onClick={handleClick}
               className="text-2xl opacity-50 px-4 inline-block rounded-lg py-2 my-2 cursor-pointer tablet:hidden"
            >
               <i className="ri-logout-box-line"></i>
            </button>
         </div>

         {/* sidechange */}
         <div className="sidechange w-96 bg-[#f5f7fb] tablet:w-full tablet:h-full">

            {button.active === 2 && <Chats />}
            {button.active === 3 && <Contacts />}
         </div>
      </div>
   );
};
