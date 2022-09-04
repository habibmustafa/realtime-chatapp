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
         className="chatinput flex items-center border-t border-[#f0eff5] dark:border-[#36404a] transition-colors duration-[350ms] p-6 tablet:py-4 tablet:px-2"
      >
         {/* message input */}
         <div className="w-full h-11 bg-[#e6ebf5] dark:bg-[#36404a] transition-colors duration-[350ms] flex items-center rounded-[6.4px]">
            <input
               autoFocus={true}
               value={value}
               onChange={(e) => setValue(e.target.value)}
               type="text"
               placeholder="Enter Message..."
               className="w-full h-full bg-inherit text-[#495057] dark:text-[#a6b0cf] py-2 font-medium px-4 text-sm leading-5 rounded-[6.4px] outline-none tablet:px-3"
            />
         </div>

         {/* icons */}
         <div className="flex items-center gap-1">
            <button className="send w-[50px] h-[45px] rounded-[6.4px] bg-transparent overflow-hidden text-[#6159cb] leading-6 py-2 px-4 tablet:px-3 tablet:py-2 tablet:w-11 tablet:h-10">
               <i className="ri-emotion-happy-line block scale-125"></i>
            </button>
            <button className="send w-[50px] h-[45px] rounded-[6.4px] bg-[#7269ef] text-white leading-6 py-2 px-4 tablet:px-3 tablet:py-2 tablet:w-11 tablet:h-10">
               <i className="ri-send-plane-2-fill"></i>
            </button>
         </div>
      </form>
   );
};
