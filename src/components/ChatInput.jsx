import { useState, useEffect, useRef } from "react";
import Picker from "emoji-picker-react";

export const ChatInput = ({ sendMessage }) => {
   const [value, setValue] = useState("");
   const [showEmoji, setShowEmoji] = useState(false);
   const emojiRef = useRef()
   const buttonRef = useRef()
   const inputRef = useRef()

   const handleSubmit = (e) => {
      e.preventDefault();
      if (value) {
         sendMessage(value);
         setValue("");
      }
   };

   const onEmojiClick = (event, emojiObject) => {
      setValue((prev) => prev + emojiObject.emoji);
   };

   useEffect(() => {
      const checkIfClickedOutside = (e) => {
         if (
            showEmoji &&
            emojiRef.current &&
            !emojiRef.current.contains(e.target) &&
            !buttonRef.current.contains(e.target)
         ) {
            setShowEmoji(false);
         }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, [showEmoji]);

   return (
      <div className="relative">
         <form
            onSubmit={handleSubmit}
            className="chatinput flex items-center border-t border-[#f0eff5] dark:border-[#36404a] transition-colors duration-[350ms] p-6 tablet:py-3 tablet:px-2"
         >
            {/* message input */}
            <div className="w-full h-11 bg-[#e6ebf5] dark:bg-[#36404a] transition-colors duration-[350ms] flex items-center rounded-[6.4px]">
               <input
                  ref={inputRef}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  type="text"
                  placeholder="Enter Message..."
                  className="w-full h-full bg-inherit text-[#495057] dark:text-[#a6b0cf] py-2 font-medium px-4 text-sm leading-5 rounded-[6.4px] outline-none tablet:px-3"
               />
            </div>

            {/* icons */}
            <div className="flex items-center gap-1 ml-1">
               <button
                  onClick={() => {
                     setShowEmoji(!showEmoji);
                     inputRef.current.focus()
                  }}
                  ref={buttonRef}
                  type="button"
                  className={`send w-[55px] h-[45px] rounded-[6.4px] bg-transparent overflow-hidden text-[#6159cb] leading-6 py-2 px-4 tablet:px-3 tablet:py-2 tablet:w-11 tablet:h-10 ${showEmoji && "border-2 border-[#7269ef]"}`}
               >
                  <i className="ri-emotion-happy-line block scale-125"></i>
               </button>
               <button
                  type="submit"
                  className="send w-[50px] h-[45px] rounded-[6.4px] bg-[#7269ef] text-white leading-6 py-2 px-4 tablet:px-3 tablet:py-2 tablet:w-11 tablet:h-10"
               >
                  <i className="ri-send-plane-2-fill"></i>
               </button>
            </div>
         </form>
         {showEmoji && (
            <div ref={emojiRef} className="absolute bottom-14 right-36 box-shadow rounded-xl tablet:relative tablet:w-full tablet:bottom-0 tablet:left-0">
               <Picker
                  onEmojiClick={onEmojiClick}
               />
            </div>
         )}
      </div>
   );
};
