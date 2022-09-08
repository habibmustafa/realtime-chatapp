import { useEffect, useState } from "react";
import { addMessage, messagesDB } from "../../firebaseCongif/messagesDB";
import { onValue, ref } from "firebase/database";
import { useSelector, useDispatch } from "react-redux";
import ChatInput from "./ChatInput";
import Header from "./Header";
import Welcome from "../Welcome";
import { uid } from "uid";
import { setMessages } from "../../store/messageSlice";
import Message from "./Message";

const ChatContainer = () => {
   const [thisMessages, setThisMessages] = useState([]);
   const [search, setSearch] = useState("");
   // const [touchShow, setTouchshow] = useState(false)
   const { user, chatUser } = useSelector((state) => state.user);
   const { messages, connectionId } = useSelector((state) => state.message);
   const { show } = useSelector((state) => state.anim);
   const dispatch = useDispatch();

   // !send message
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

   // !getConnection
   useEffect(() => {
      onValue(ref(messagesDB, `connection`), (snapshot) => {
         const data = snapshot.val();
         if (data !== null) {
            dispatch(setMessages(Object.values(data).map((item) => item)));
         }
      });
   }, [dispatch]);

   // !active user messages - thisMessages
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
         setThisMessages([]);
      };
   }, [connectionId, messages]);

   // !touch event
   // let touchTimer=null;
   // const touchStart = () => {
   //    if(!touchTimer) {
   //       touchTimer = setTimeout(() => {
   //          setTouchshow(true)
   //       }, 1000);
   //    }
   // }
   // const touchEnd = () => {
   //    if(touchTimer) {
   //       clearTimeout(touchTimer)
   //       touchTimer = null;
   //       console.log(1);
   //    }
   // }

   // !search message
   const searchMessage = (value) => {
      setSearch(value);
   };

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
               <div className="messages flex-1 flex flex-col p-6 pb-1 overflow-auto scrollbar-border scrollbar-current scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:scrollbar-thumb-slate-300 tablet:dark:scrollbar-thumb-slate-500 tablet:px-1.5">

                  {/* message */}
                  {thisMessages &&
                     thisMessages
                        .filter(
                           (name) =>
                              !name.message.text
                                 .toLowerCase()
                                 .indexOf(search.toLowerCase()) || search === ""
                        )
                        .map((message, i) => (
                           <Message
                              key={i}
                              message={message}
                              i={i}
                              thisMessages={thisMessages}
                           />
                        ))}
               </div>

               {/* chat input */}
               <ChatInput sendMessage={sendMessage} />
            </div>
         ) : (
            <Welcome />
         )}
      </div>
   );
};

export default ChatContainer;
