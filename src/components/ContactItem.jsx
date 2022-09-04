import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChatUserId } from "../store/userSlice";
import { setConnectionId } from "../store/messageSlice";
import { setShow } from "../store/animSlice";

const ContactItem = ({ cUser, index }) => {
   const { user, allUsers } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   const handleClick = () => {
      dispatch(setShow(true));
      dispatch(setChatUserId(cUser.uid))
      
      if (user.uid < cUser.uid) {
         dispatch(setConnectionId(`${user.uid}${cUser.uid}`));
      } else {
         dispatch(setConnectionId(`${cUser.uid}${user.uid}`));
      }
   };

   return (
      <ul>
         {!index && (
            <div className="p-4 text-[15px] font-semibold text-[#7269ef] uppercase leading[22.5px] underline">
               {cUser.username[0]}
            </div>
         )}
         {index > 0 &&
            allUsers[index - 1].username[0].toLowerCase() !== cUser.username[0].toLowerCase() && (
               <div className="p-4 text-[15px] font-semibold text-[#7269ef] uppercase leading[22.5px] mt-5 underline">
                  {cUser.username[0]}
               </div>
            )}
         <li
            onClick={handleClick}
            className="flex justify-between items-center py-2.5 px-5 opacity-90 dark:opacity-100 cursor-pointer"
         >
            <p className="text-sm font-semibold text-left text-[#495057] dark:text-[#e1e9f1] tracking-wide transition-colors duration-300">
               {cUser.username}
            </p>
            <span className="text-[#7a7f9a] dark:text-[#9aa1b9] transition-colors duration-150">
               <i className="ri-more-2-fill"></i>
            </span>
         </li>
      </ul>
   );
};

export default ContactItem;
