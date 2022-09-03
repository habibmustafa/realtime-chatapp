import React from "react";
import { useState } from "react";

export const ChatInput = ({ sendMessage }) => {
   const [value, setValue] = useState("");
   
   const handleSubmit = (e) => {
      e.preventDefault();
      if (value) {
         sendMessage(value);
         setValue("");
      }
   };

   return (
      <form
         onSubmit={handleSubmit}
         className="chatinput flex items-center border-t border-zinc-100 p-6 tablet:py-4 tablet:px-4"
      >
         {/* message input */}
         <div className="w-full h-11 bg-[#e6ebf5] flex items-center rounded-[6.4px]">
            <input
               value={value}
               onChange={(e) => setValue(e.target.value)}
               type="text"
               placeholder="Enter Message..."
               className="w-full h-full bg-inherit text-[#495057] py-2 font-medium px-4 text-sm leading-5 rounded-[6.4px] outline-none tablet:px-3"
            />
         </div>

         {/* icons */}
         <div className="flex items-center gap-1.5">
            <button className="send w-[50px] h-[45px] rounded-[6.4px] bg-white text-[#6159cb] leading-6 py-2 px-4 tablet:px-3 tablet:py-2 tablet:w-11 tablet:h-10">
               <i className="ri-emotion-happy-line"></i>
            </button>
            <button className="send w-[50px] h-[45px] rounded-[6.4px] bg-[#7269ef] text-white leading-6 py-2 px-4 tablet:px-3 tablet:py-2 tablet:w-11 tablet:h-10">
               <i className="ri-send-plane-2-fill"></i>
            </button>
         </div>
      </form>
   );
};
