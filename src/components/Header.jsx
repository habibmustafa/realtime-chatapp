import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShow } from "../store/animSlice";

export const Header = ({searchMessage}) => {
   const [backBtn, setBackBtn] = useState(
      window.innerWidth <= 991 ? true : false
   );
   const [open, setOpen] = useState(false);
   const [value, setValue] = useState('')
   const buttonRef = useRef()
   const animRef = useRef()
   const dispatch = useDispatch();
   const { chatUser } = useSelector((state) => state.user);

   const handleResize = () => {
      window.innerWidth <= 991 ? setBackBtn(true) : setBackBtn(false);
   };

   // resize back button visibility
   useEffect(() => {
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("resize", handleResize);
      };
   }, [backBtn]);

   // mousedown close
   useEffect(() => {
      const checkIfClickedOutside = (e) => {
         if (open && animRef.current && !animRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setOpen(false);
         }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, [open]);

   // search value change
   // useCallback a al
   useEffect(() => {
      searchMessage(value)
   }, [value])
   


   return (
      <div className="header p-6 border-b border-[#f0eff5] dark:border-[#36404a] transition-colors duration-[350ms] text-[#495057] dark:text-[#e1e9f1] text-[15px] leading-[22.5px] flex justify-between tablet:py-4 tablet:px-1.5">
         {/* name */}
         <div className="flex items-center gap-3.5 w-full">
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
            <div className="rounded-full w-[35px] h-[35px] bg-cover text-left flex-shrink-0">
               <img className="rounded-full " src={chatUser.avatar} alt="" />
            </div>
            <div className="flex flex-col w-full">
               <p className="cursor-pointer font-semibold leading-5 tracking-wide">
                  {chatUser?.username}
               </p>
               <span
                  className={`text-sm w-full text-green-500 ${
                     !chatUser?.isActive.status &&
                     "!text-[#7a7f9a] dark:text-[#abb4d2]"
                  }`}
               >
                  {chatUser.isActive.status
                     ? chatUser.isActive.content
                     : chatUser.isActive.content.substring(0, 11) ===
                       new Date().toString().substring(4, 15)
                     ? `Today, ${chatUser.isActive.content.substring(12, 17)}`
                     : chatUser.isActive.content}
               </span>
            </div>
         </div>

         {/* right icons */}
         <div className="text-xl relative text-[#7a7f9a] dark:text-[#abb4d2] transition-colors duration-[350ms] text-center flex items-end gap-2">
            <button
               ref={buttonRef}
               onClick={() => {setOpen(!open)}}
               className="w-10 h-10 leading-10 hover:scale-110"
            >
               <i className="ri-search-line"></i>
            </button>

            {/* search */}
            {open && (
               <div ref={animRef} className={`absolute z-10 w-60 mobile:w-48 right-3/4 top-full p-2 rounded box-shadow border-[1px] border-[#f0eff5] dark:bg-[#313a43] dark:border-[#36404a] ${open ? "openAnimation" : " closeAnimation"}`}>
                  <input value={value} onChange={(e) => {setValue(e.target.value)}} type="text" placeholder="Search.." className="bg-[#E6EBF5] w-full rounded text-sm leading-[21px] px-4 py-2 border-none outline-none text-[#495057] dark:bg-[#36404A] dark:text-[#a6b0cf]" />
               </div>
            )}
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
