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
   }, [connectionId, messages]);

   // scroll down
   useEffect(() => {
      scrollRef.current?.scrollIntoView();
   }, [thisMessages, chatUser]);

   // receive messages
   return (
      <div
         className={`chatcontainer flex-1 bg-white mr-0.5 transition-all duration-500 h-full tablet:absolute tablet:z-20 tablet:w-full ${
            !show ? "tablet:-left-full" : "tablet:left-0"
         }`}
      >
         {chatUser ? (
            <div className="flex h-full flex-col">
               <Header />

               {/* messages container */}
               <div className="messages flex-1 flex flex-col p-6 pb-1 gap-7 overflow-y-auto overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300">
                  {/* message */}
                  {thisMessages &&
                     thisMessages.map((message, i) => (
                        <div
                           key={i}
                           ref={scrollRef}
                           className={`flex items-end justify-end gap-2.5 ${
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
                                    {/* <i className="ri-more-2-fill"></i> */}
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
                                    className={`px-5 py-1.5 rounded-xl min-w-[90px] max-w-lg flex flex-col items-start bg-[#7269ef] text-white ${
                                       message.sender === chatUser.uid &&
                                       "items-end !bg-[#f5f7fb] !text-[#212529]"
                                    }`}
                                 >
                                    <p className="text-[15px] leading-6 font-medium break-all">
                                       {message.message.text}
                                    </p>
                                    <span
                                       className={`w-full text-[#ffffff80] text-xs leading-[18px] inline-block ${
                                          message.sender === chatUser.uid &&
                                          "!text-[#7a7f9a] text-right"
                                       }`}
                                    >
                                       {message.time}
                                    </span>
                                 </div>
                              </div>
                              <p className="text-[#495057] text-sm leading-5 font-medium">
                                 {/* text-left */}
                                 {message.sender === user.uid
                                    ? user.username
                                    : chatUser.username}
                              </p>
                           </div>

                           {/* profile */}
                           <div className="flex items-end rounded-full w-[35px] h-[35px] bg-cover text-right">
                              <img
                                 className="rounded-full "
                                 src="https://image.shutterstock.com/image-vector/profile-blank-icon-empty-photo-260nw-535853269.jpg"
                                 alt=""
                              />
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
