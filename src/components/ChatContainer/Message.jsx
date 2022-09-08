import { useState } from "react";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { MessageSettings } from "../AnimatedDropdown";
import TimeSeperate from "./TimeSeperate";

const Message = (props) => {
   const { message, i, thisMessages } = props;
   const [touchShow, setTouchshow] = useState(false);
   const { user, chatUser } = useSelector((state) => state.user);
   const scrollRef = useRef();

   // !scroll down
   useEffect(() => {
      scrollRef.current?.scrollIntoView();
   }, [thisMessages, chatUser]);

   // !touch event
   let touchTimer = null;
   const touchStart = () => {
      touchTimer = setTimeout(() => {
         setTouchshow(true);
         console.log("timeOut");
      }, 550);
      console.log("start");
   };
   const touchEnd = () => {
      clearTimeout(touchTimer);
      touchTimer = null;
      console.log("end");
   };

   return (
      <div ref={scrollRef} onTouchStart={touchStart} onTouchEnd={touchEnd}>
         {/* time seperate */}
         <TimeSeperate {...props} />

         {/* message */}
         <div
            className={`flex items-end justify-end relative gap-2.5 mt-6 tablet:gap-0 tablet:mt-3.5 ${
               message.sender === chatUser.uid && "flex-row-reverse"
            } ${
               touchShow &&
               "before:absolute before:openBeforeAnimation before:w-full before:h-[108%] before:-top-[4%] before:rounded-lg before:bg-blue-300 before:opacity-70"
            } `}
         >
            <div
               className={`flex flex-col gap-4 tablet:max-w-[82%] absview:max-w-[70%] ${
                  message.sender === chatUser.uid ? "items-start" : "items-end"
               }`}
            >
               <div
                  className={`flex relative ${
                     message.sender === chatUser.uid && "flex-row-reverse"
                  }`}
               >
                  {/* more icon */}
                  <div className="w-4 h-[15px] text-[#6159cb] relative text-[15px] leading-6 text-right inline-block">
                     <MessageSettings
                        message={message}
                        setTouch={setTouchshow}
                        align={
                           message.sender === chatUser.uid
                              ? "left-0"
                              : "right-0"
                        }
                     />
                  </div>

                  {/* text content */}
                  <div
                     tabIndex="14"
                     className={`px-5 py-1.5 rounded-xl min-w-[90px] max-w-lg flex flex-col transition-colors duration-300 select-none ${
                        message.sender === chatUser.uid
                           ? "items-end bg-[#f5f7fb] text-[#212529] dark:bg-[#36404a] dark:text-[#eff2f7] rounded-bl-none active:bg-[#d9dee2] dark:active:bg-[#212529]"
                           : "bg-[#7269ef] text-white items-start rounded-br-none active:bg-[#383199]"
                     } ${touchShow && "opacity-70"}`}
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

                  {/* touch dropdown show-hidden */}
                  {touchShow && (
                     <MessageSettings
                        touch={touchShow}
                        setTouch={setTouchshow}
                        message={message}
                        align={
                           message.sender === chatUser.uid
                              ? "top-full left-3"
                              : "top-full right-3"
                        }
                     />
                  )}
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
