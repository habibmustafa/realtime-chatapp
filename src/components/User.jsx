import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatUser } from "../store/userSlice";
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
      dispatch(setChatUser(cUser));

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

   // helelik
   // useEffect(() => {
   //    if (chatUser) {
   //       dispatch(setChatUser(cUser));
   //    }
   // }, [cUser.isActive]);

   useEffect(() => {
      if (
         show &&
         !cUser.seen &&
         connectionId &&
         cUser.sender === cUser.uid
      ) {
         set(ref(messagesDB, `connection/${connectionId}/options/seen`), true);
      }
   }, [cUser.seen]);

   return (
      <div
         onClick={handleClick}
         className={`cursor-pointer h-[74px] overflow-hidden whitespace-normal text-ellipsis rounded-1 text-[15px] text-[#7a7f9a] leading-[22.5px] py-4 px-5 mb-0.5 flex justify-between gap-4 transition duration-300 hover:bg-[#e6ebf5] ${
            (window.innerWidth > 991 && chatUser.uid === cUser.uid) && "bg-[#e6ebf5]"
         } `}
      >
         <div
            className={`rounded-full w-[35px] h-[35px] bg-cover box-content overflow-hidden text-left shadow-sm ${
               cUser.isActive && "border-2 border-green-600"
            }`}
         >
            <img
               className="rounded-full"
               src="https://image.shutterstock.com/image-vector/profile-blank-icon-empty-photo-260nw-535853269.jpg"
               alt="profil"
            />
         </div>
         <div className="flex-1 w-10">
            <h5 className="font-semibold text-[15px] text-[#495057] leading-[18px] mb-1">
               {cUser.username}
            </h5>

            {/* text */}
            <div className="flex items-start gap-1 text-sm">
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
         <div className="text-[11px] leading-4 h-full flex flex-col justify-start items-center gap-0.5 w-10">
            {cUser.time && <span>{cUser.time.substring(16, 21)}</span>}
            {!cUser.seen && cUser.sender !== user.uid ? (
               <span className="w-[18px] h-[21px] bg-[#ef476f2e] text-[#ef476f] text-[10px] rounded-[800px] font-semibold leading-4 py-[2.5px] px-1.5 text-center">
                  1
               </span>
            ) : (
               cUser.isActive && (
                  <span className="text-sm text-green-500">Online</span>
               )
            )}
         </div>
      </div>
   );
};
