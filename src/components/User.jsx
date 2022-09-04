import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatUserId } from "../store/userSlice";
import { setConnectionId } from "../store/messageSlice";
import { setShow } from "../store/animSlice";
import { ref, set } from "firebase/database";
import { messagesDB } from "../firebaseCongif/messagesDB";

export const User = ({ cUser }) => {
   const { user, chatUser } = useSelector((state) => state.user);
   const { connectionId } = useSelector((state) => state.message);
   const { show } = useSelector((state) => state.anim);
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(setShow(true));
      dispatch(setChatUserId(cUser.uid));

      let id = null;
      if (user.uid < cUser.uid) {
         id = `${user.uid}${cUser.uid}`;
         dispatch(setConnectionId(id));
      } else {
         id = `${cUser.uid}${user.uid}`;
         dispatch(setConnectionId(id));
      }

      if (!cUser.seen && id && cUser.sender === cUser.uid) {
         set(ref(messagesDB, `connection/${id}/options/seen`), true);
      }
   };

   useEffect(() => {
      if (show && !cUser.seen && connectionId && cUser.sender === cUser.uid) {
         set(ref(messagesDB, `connection/${connectionId}/options/seen`), true);
      }
   }, [cUser.seen]);

   return (
      <div
         onClick={handleClick}
         className={`cursor-pointer h-[74px] overflow-hidden whitespace-normal text-ellipsis rounded-1 text-[15px] text-[#7a7f9a] leading-[22.5px] py-4 px-5 mb-0.5 flex justify-between gap-3 transition-colors duration-300 hover:bg-[#e6ebf5] dark:hover:bg-[#36404a] ${
            window.innerWidth > 991 &&
            chatUser.uid === cUser.uid &&
            "bg-[#e6ebf5] dark:bg-[#36404a]"
         } `}
      >
         <div
            className={`rounded-full w-[35px] h-[35px] bg-cover box-content overflow-hidden text-left mr-1 shadow-sm dark:shadow-lg ${
               cUser.isActive.status &&
               "border-2 border-green-600 dark:border-green-500"
            }`}
         >
            <img
               className="rounded-full"
               src={cUser.avatar}
               alt="profile-light"
            />
         </div>
         <div className="flex-1 w-10">
            <h5 className="font-semibold text-[15px] text-[#495057] dark:text-[#e1e9f1] transition-colors duration-300 tracking-wide leading-[18px] mb-1">
               {cUser.username}
            </h5>

            {/* text */}
            <div className="flex items-start gap-1 text-sm dark:text-[#abb4d2] transition-colors duration-300">
               {cUser.sender === user.uid && (
                  <span className="font-semibold">You:</span>
               )}
               <p
                  className={`leading-5 h-6 overflow-hidden whitespace-normal text-ellipsis ${
                     !cUser.seen && cUser.sender !== user.uid && "font-semibold"
                  }`}
               >
                  {cUser.message.text}
               </p>
            </div>
         </div>
         <div className="text-[11px] leading-4 h-full flex flex-col  justify-start items-center gap-0.5 w-10">
            <span className="dark:text-[#abb4d2] transition-colors duration-300">
               {cUser.time.substring(16, 21)}
            </span>
            {!cUser.seen && cUser.sender !== user.uid ? (
               <span className="w-[18px] h-[21px] bg-[#ef476f2e] text-[#ef476f] text-[10px] rounded-[800px] font-semibold leading-4 py-[2.5px] px-1.5 text-center">
                  1
               </span>
            ) : (
               cUser.isActive.status && (
                  <span className="text-sm text-green-500">{cUser.isActive.content}</span>
               )
            )}
         </div>
      </div>
   );
};
