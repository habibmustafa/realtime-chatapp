import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChatUser } from "../store/userSlice";
import { setConnectionId } from "../store/messageSlice";
import { setShow } from "../store/animSlice";

export const User = ({ cUser, hidden = false }) => {
   const { user, chatUser } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(setShow(true));
      dispatch(setChatUser(cUser))

      if (user.uid < cUser.uid) {
         dispatch(setConnectionId(`${user.uid}${cUser.uid}`));
      } else {
         dispatch(setConnectionId(`${cUser.uid}${user.uid}`));
      }
   };

   useEffect(() => {
      if(chatUser) {
         dispatch(setChatUser(cUser))
      }
   }, [cUser.isActive])

   return (
      <div
         onClick={handleClick}
         className={`cursor-pointer rounded-1 text-[15px] text-[#7a7f9a] leading-[22.5px] py-4 px-5 mb-0.5 flex justify-between gap-4 transition-all duration-200 hover:bg-[#e6ebf5] ${
            1 === 2 && "bg-[#e6ebf5]"
         } `}
      >
         <div className="rounded-full w-[35px] h-[35px] bg-cover text-left">
            <img
               className="rounded-full "
               src="https://image.shutterstock.com/image-vector/profile-blank-icon-empty-photo-260nw-535853269.jpg"
               alt=""
            />
         </div>
         <div className="flex-1 ">
            <h5 className="font-semibold text-[15px] text-[#495057] leading-[18px] mb-1">
               {cUser.username}
            </h5>
            <p className="text-sm leading-5">{cUser.lastMessage}</p>
         </div>
         <div className="text-[11px] leading-4 h-full flex flex-col justify-center items-center gap-0.5 w-5">
            <span>{hidden || cUser.lastTime}</span>
            <span className="text-sm text-green-500">
               {cUser.isActive && "Online"}
            </span>
         </div>
      </div>
   );
};
