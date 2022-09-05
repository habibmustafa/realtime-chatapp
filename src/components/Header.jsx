import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../store/animSlice";

export const Header = () => {
   const [backBtn, setBackBtn] = useState(
      window.innerWidth <= 991 ? true : false
   );
   const dispatch = useDispatch();
   const { chatUser } = useSelector((state) => state.user);

   const handleResize = () => {
      window.innerWidth <= 991 ? setBackBtn(true) : setBackBtn(false);
   };

   useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [backBtn]);

   return (
      <div className="header p-6 border-b border-[#f0eff5] dark:border-[#36404a] transition-colors duration-[350ms] text-[#495057] dark:text-[#e1e9f1] text-[15px] leading-[22.5px] flex justify-between tablet:py-4 tablet:px-1.5">
         {/* name */}
         <div className="flex items-center gap-3.5">
            {backBtn && (
               <div
                  className="flex items-center cursor-pointer h-full"
                  onClick={() => {
                     dispatch(setShow(false));
                  }}
               >
                  <i className="ri-arrow-left-s-line text-[28px]"></i>
               </div>
            )}
            <div className="rounded-full w-[35px] h-[35px] bg-cover text-left">
               <img className="rounded-full " src={chatUser.avatar} alt="" />
            </div>
            <div className="flex flex-col">
               <p className="cursor-pointer font-semibold leading-5 tracking-wide">
                  {chatUser?.username}
               </p>
               <span className={`text-sm text-green-500 ${!chatUser?.isActive.status && "!text-[#7a7f9a] dark:text-[#abb4d2]"}`}>
                  {chatUser.isActive.status
                     ? chatUser.isActive.content
                     : chatUser.isActive.content.substring(11, 22) ===
                       new Date().toString().substring(4, 15)
                     ? `Today, ${chatUser.isActive.content.substring(23, 28)}`
                     : chatUser.isActive.content}
               </span>
            </div>
         </div>

         {/* right icons */}
         <div className="text-xl text-[#7a7f9a] dark:text-[#abb4d2] transition-colors duration-[350ms] text-center flex items-center gap-2">
            <button className="w-10 h-10 leading-10 hover:scale-110">
               <i className="ri-search-line"></i>
            </button>
            <button className="w-10 h-10 leading-10 hover:scale-110 tablet:hidden">
               <i className="ri-user-2-line"></i>
            </button>
            <button className="w-10 h-10 leading-10 hover:scale-110">
               <i className="ri-more-fill"></i>
            </button>
         </div>
      </div>
   );
};
