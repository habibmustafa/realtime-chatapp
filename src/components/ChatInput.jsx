import { ref, remove, set } from "firebase/database";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { messagesDB } from "../firebaseCongif/messagesDB";

export const ChatInput = ({ sendMessage }) => {
   const [value, setValue] = useState("");
   const { connectionId } = useSelector((state) => state.message);
   const {user} = useSelector(state => state.user)

   const handleSubmit = (e) => {
      e.preventDefault();
      if (value) {
         sendMessage(value);
         setValue("");
      }
   };

   useEffect(() => {
      const timeOut = () => {
         remove(ref(messagesDB, `connection/${connectionId}/messages/writing`))
      }
      if (value) {
         set(ref(messagesDB, `connection/${connectionId}/messages/writing`), {
            uuid: "writing",
            sender: user.uid,
            message: { text: "typing..." },
            createdAt: new Date().getTime(),
            
         });
         setTimeout(timeOut, 1500)
      }
      else {
         timeOut()
      }
      return () => {
         clearTimeout(timeOut)
      }
      
   }, [value]);

   useEffect(() => {
      return () => {
         setValue('')
      }
   },[])

   return (
      <form
         onSubmit={handleSubmit}
         className="chatinput flex items-center border-t border-zinc-100 p-6 tablet:py-4 tablet:px-4"
      >
         {/* message input */}
         <div className="w-full h-11 bg-[#e6ebf5] flex items-center rounded-[6.4px]">
            <input
               autoFocus={true}
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
