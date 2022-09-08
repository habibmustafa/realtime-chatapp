import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MessageSettings } from "../AnimatedDropdown";
import TimeSeperate from "./TimeSeperate";

const Message = (props) => {
   const { message, i, thisMessages } = props;
   const { user, chatUser } = useSelector((state) => state.user);
   const scrollRef = useRef();

   // !scroll down
   useEffect(() => {
      scrollRef.current?.scrollIntoView();
   }, [thisMessages, chatUser]);

   return (
      <div ref={scrollRef}>
         
         {/* time seperate */}
         <TimeSeperate {...props} />

         {/* message */}
         <div
            className={`flex items-end justify-end gap-2.5 mt-6 tablet:gap-0 tablet:mt-3.5 ${
               message.sender === chatUser.uid && "flex-row-reverse"
            }`}
         >
            <div
               className={`flex flex-col gap-4 tablet:max-w-[80%] ${
                  message.sender === chatUser.uid ? "items-start" : "items-end"
               }`}
            >
               <div
                  className={`flex ${
                     message.sender === chatUser.uid && "flex-row-reverse"
                  }`}
               >

                  {/* more icon */}
                  <div className="w-4 h-[15px] text-[#6159cb] relative text-[15px] leading-6 text-right inline-block">
                     <MessageSettings
                        message={message}
                        align={
                           message.sender === chatUser.uid
                              ? "left-0"
                              : "right-0"
                        }
                     />
                  </div>

                  {/* text content */}
                  <div
                     // onTouchStart={touchStart}
                     // onTouchCancel={touchCancel}
                     // onTouchEnd={touchEnd}
                     className={`px-5 py-1.5 rounded-xl min-w-[90px] max-w-lg flex flex-col transition-colors duration-[350ms] ${
                        message.sender === chatUser.uid
                           ? "items-end bg-[#f5f7fb] text-[#212529] dark:bg-[#36404a] dark:text-[#eff2f7] rounded-bl-none"
                           : "bg-[#7269ef] text-white items-start rounded-br-none"
                     }`}
                  >
                     <p className="text-[15px] leading-6 font-medium break-all">
                        {message.message.text}
                     </p>
                     <span
                        className={`w-full text-[#ffffff80] dark:text-[#B9B4F7] text-xs leading-[18px] ${
                           message.sender === chatUser.uid &&
                           "!text-[#7a7f9a] dark:text-[#abb4d2] text-right"
                        }`}
                     >
                        {message.time.substring(16, 21)}
                     </span>
                  </div>
               </div>

               {/* last message user about */}
               {(thisMessages.length - 1 !== i &&
                  thisMessages[i + 1].sender === message.sender) || (
                  <p className="text-[#495057] dark:text-[#a6b0cf] transition-colors duration-[350ms] text-sm leading-5 font-medium tablet:mx-2 tablet:text-xs">
                     {message.sender === user.uid
                        ? user.username
                        : chatUser.username}
                  </p>
               )}
            </div>

            {/* profile */}
            <div className="flex items-end rounded-full w-[35px] h-[35px] bg-cover text-right tablet:w-7 tablet:h-7">
               {(thisMessages.length - 1 !== i &&
                  thisMessages[i + 1].sender === message.sender) || (
                  <img
                     className="rounded-full "
                     src={
                        message.sender === user.uid
                           ? user.avatar
                           : chatUser.avatar
                     }
                     alt=""
                  />
               )}
            </div>
            {/* {messages.find((item) => item.connectionId === connectionId).options.writing && <p>yaziyor..</p>} */}
         </div>
      </div>
   );
};

export default Message;
