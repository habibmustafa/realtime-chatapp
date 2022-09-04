import React, { useState, useEffect } from "react";
import { User } from "./User";
import { useSelector } from "react-redux/es/exports";

export const Chats = () => {
   const [search, setSearch] = useState("");
   const [recentUsers, setRecentUsers] = useState([]);
   const { user, allUsers } = useSelector((state) => state.user);
   const { messages, connectionId } = useSelector((state) => state.message);

   useEffect(() => {
      const newArray = [];
      allUsers &&
         allUsers?.forEach((User) => {
            const aa = messages
               ?.filter(
                  (item) =>
                     item.connectionId.indexOf(User.uid) !== -1 &&
                     item.connectionId.indexOf(user.uid) !== -1
               )
               .map((item) => {
                  if (item.messages) {
                     return {
                        typing: item.options.typing,
                        seen: item.options.seen,
                        ...User,
                        ...Object.values(item.messages).sort(
                           (a, b) => a.createdAt - b.createdAt
                        )[Object.values(item.messages).length - 1],
                     };
                  }
                  return false;
               })[0];
            aa && newArray.push(aa);
         });
      const bb = newArray.sort((a, b) => b.createdAt - a.createdAt);
      setRecentUsers(bb.length ? bb : false);
   }, [messages, user, connectionId, allUsers]);

   return (
      <div className="chats h-full dark:bg-[#303841] box-shadow relative z-10 transition-colors duration-[350ms]">
         <div className="py-6 px-7">
            <h4 className="h4-size mb-6 dark:text-[#e1e9f1] transition-colors duration-300">Chats</h4>

            {/* search */}
            <div className="w-[333px] h-11 bg-[#e6ebf5] dark:bg-[#36404a] transition-colors duration-300 flex items-center rounded-[6.4px] mb-6 tablet:w-full">
               <span className="flex items-center justify-center ml-2 w-9 h-full">
                  <i className="ri-search-line search-icon text-lg leading-7 text-[#7a7f9a] dark:text-[#9aa1b9]"></i>
               </span>
               <input
                  type="search"
                  onChange={(e) => {
                     setSearch(e.target.value);
                  }}
                  value={search}
                  placeholder="Search messages or users.."
                  className="w-full h-full bg-inherit text-[#495057] dark:text-[#a6b0cf] py-2 font-medium px-3 text-sm leading-5 rounded-[6.4px] outline-none"
               />
            </div>
         </div>

         {/* recent */}
         <div className="recent px-3">
            <h5 className="text-[#495057] dark:text-[#e1e9f1] transition-colors duration-300 font-semibold leading-5 mb-4">
               Recent
            </h5>
            <div className="users max-h-[665px] h-full overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:max-h-[620px]">
               {allUsers ? (
                  !recentUsers ? (
                     <div className="flex justify-center items-center font-semibold mt-28 dark:text-[#e1e9f1]">
                        Start a Chat
                     </div>
                  ) : (
                     recentUsers
                        .filter(
                           (name) =>
                              !name.username
                                 .toLowerCase()
                                 .indexOf(search.toLowerCase()) || search === ""
                        )
                        .map((cUser) => <User key={cUser.uid} cUser={cUser} />)
                  )
               ) : (
                  <div className="flex justify-center items-center mt-28 dark:text-[#e1e9f1]">
                     Loading...
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
