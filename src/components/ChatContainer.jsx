import { addMessage, messagesDB } from "../firebaseCongif/messagesDB";
import { onValue, ref } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import { ChatInput } from "./ChatInput";
import { Header } from "../components/Header";
import { Welcome } from "../components/Welcome";
import { uid } from "uid";
import { useEffect, useState, useRef } from "react";
import { setMessages } from "../store/messageSlice";
import AnimatedDropdown from "./AnimatedDropdown";

export const ChatContainer = () => {
   const [thisMessages, setThisMessages] = useState([]);
   const [search, setSearch] = useState('')
   const { user, chatUser } = useSelector((state) => state.user);
   const { messages, connectionId } = useSelector((state) => state.message);
   const { show } = useSelector((state) => state.anim);
   const dispatch = useDispatch();
   const scrollRef = useRef();

   // send messages
   const sendMessage = (value) => {
      if (!value) {
         return false;
      }
      const uuid = uid();

      if (connectionId) {
         addMessage(
            connectionId,
            uuid,
            value,
            user.uid,
            user.username,
            chatUser.uid,
            chatUser.username
         );
      }
   };

   useEffect(() => {
      onValue(ref(messagesDB, `connection`), (snapshot) => {
         const data = snapshot.val();
         if (data !== null) {
            dispatch(setMessages(Object.values(data).map((item) => item)));
         }
      });
   }, [dispatch]);

   useEffect(() => {
      messages &&
         setThisMessages(
            messages
               .filter((item) => item.connectionId === connectionId)
               .map((item) => {
                  if (item.messages)
                     return Object.values(item.messages).sort(
                        (a, b) => a.createdAt - b.createdAt
                     );
                  else return false;
               })[0]
         );

         return () => {
            setThisMessages([])
         }
   }, [connectionId, messages]);

   // scroll down
   useEffect(() => {
      scrollRef.current?.scrollIntoView();
   }, [thisMessages, chatUser]);

   const searchMessage = (value) => {
      setSearch(value)
   }

   // receive messages
   return (
      <div
         className={`chatcontainer flex-1 bg-white dark:bg-[#262E35] transition-all duration-[400ms] pr-0.5 h-full tablet:absolute tablet:z-20 tablet:w-full ${
            !show ? "tablet:-left-full" : "tablet:left-0"
         }`}
      >
         {chatUser ? (
            <div className="flex h-full flex-col">
               <Header searchMessage={searchMessage} />

               {/* messages container */}
               <div className="messages flex-1 flex flex-col p-6 pb-1 overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:px-1.5">
                  {/* message */}
                  {thisMessages &&
                     thisMessages.filter(name => !name.message.text.toLowerCase().indexOf(search.toLowerCase()) || search === "")
                     .map((message, i) => (
                        <div ref={scrollRef} key={i}>
                           
                           {/* timer */}
                           {(!i && message.time ) && (
                              <div className="w-full h-[1px] bg-[#f0eff5] dark:bg-[#36404a] transition-colors duration-[350ms] text-[15px] text-center mb-14 relative tablet:mb-12">
                                 <span className="bg-[#f0eff5] transition-colors duration-[350ms] dark:bg-[#36404a] rounded-md text-[13px] leading-5 py-1.5 px-3 text-center text-[#495057] dark:text-[#a6b0cf] absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    {new Date().toString().substring(4,15) === message.time.substring(4, 15) ? `Today` : `${message.time.substring(8, 11)} ${message.time.substring(4, 7)}, ${message.time.substring(11, 15)}`}
                                 </span>
                              </div>
                           )}
                           {(i > 0 && message.time &&
                              thisMessages[i - 1].time?.substring(0, 15) !==
                                 message.time?.substring(0, 15)) && (
                                 <div className="w-full h-[1px] bg-[#f0eff5] dark:bg-[#36404a] transition-colors duration-[350ms] leading-[22.5px] text-center mb-14 mt-11 relative tablet:mb-12">
                                    <span className="bg-[#f0eff5] transition-colors duration-[350ms] dark:bg-[#36404a] rounded-md text-[13px] leading-5 py-1.5 px-3 text-center text-[#495057] dark:text-[#a6b0cf] absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                       {new Date().toString().substring(4,15) === message.time.substring(4, 15) ? `Today` : `${message.time.substring(8, 11)} ${message.time.substring(4, 7)}, ${message.time.substring(11, 15)}`}
                                    </span>
                                 </div>
                              )}

                              {/* message */}
                           <div
                              className={`flex items-end justify-end gap-2.5 mt-7 tablet:gap-0 tablet:mt-5 ${
                                 message.sender === chatUser.uid &&
                                 "flex-row-reverse"
                              }`}
                           >
                              {/*  flex-row-reverse */}
                              <div
                                 className={`flex flex-col gap-4 ${
                                    message.sender === chatUser.uid
                                       ? "items-start"
                                       : "items-end"
                                 }`}
                              >
                                 {/* items-start */}
                                 <div
                                    className={`flex ${
                                       message.sender === chatUser.uid &&
                                       "flex-row-reverse"
                                    }`}
                                 >
                                    {/* flex-row-reverse */}

                                    {/* icon */}
                                    <div className="w-4 h-[15px] text-[#6159cb] relative text-[15px] leading-6 text-right inline-block">
                                       <AnimatedDropdown
                                          message={message}
                                          align={
                                             message.sender === chatUser.uid
                                                ? "left-0"
                                                : "right-0"
                                          }
                                       />
                                    </div>

                                    {/* content */}
                                    <div
                                       className={`px-5 py-1.5 rounded-xl min-w-[90px] max-w-lg flex flex-col transition-colors duration-[350ms] ${
                                          message.sender === chatUser.uid ?
                                          "items-end bg-[#f5f7fb] text-[#212529] dark:bg-[#36404a] dark:text-[#eff2f7] rounded-bl-none" : 
                                          "bg-[#7269ef] text-white items-start rounded-br-none"
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
                                          {message.time.substring(16,21)}
                                       </span>
                                    </div>
                                 </div>
                                 {(thisMessages.length-1 !== i && thisMessages[i+1].sender === message.sender) || <p className="text-[#495057] dark:text-[#a6b0cf] transition-colors duration-[350ms] text-sm leading-5 font-medium tablet:mx-2 tablet:text-xs">
                                    {/* text-left */}
                                    {message.sender === user.uid
                                       ? user.username
                                       : chatUser.username}
                                 </p>}
                              </div>

                              {/* profile */}
                                 <div className="flex items-end rounded-full w-[35px] h-[35px] bg-cover text-right tablet:w-7 tablet:h-7">
                                 {(thisMessages.length-1 !== i && thisMessages[i+1].sender === message.sender) || <img
                                    className="rounded-full "
                                    src={message.sender === user.uid ? user.avatar : chatUser.avatar}
                                    alt=""
                                 />}
                                    
                              </div>
                              {/* {messages.find((item) => item.connectionId === connectionId).options.writing && <p>yaziyor..</p>} */}
                           </div>   
                        </div>
                     ))}
               </div>
               <ChatInput sendMessage={sendMessage} />
            </div>
         ) : (
            <Welcome />
         )}
      </div>
   );
};