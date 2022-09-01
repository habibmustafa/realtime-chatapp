import React from "react";
import {useSelector, useDispatch} from "react-redux"
import { setChatUser } from "../store/userSlice";
import { setConnectionId } from "../store/messageSlice";

const ContactItem = ({cUser}) => {
   const { user } = useSelector((state) => state.user);
   const dispatch = useDispatch()  

   const handleClick = () => {

      dispatch(setChatUser(cUser));
      if (user.uid < cUser.uid) {
         dispatch(setConnectionId(`${user.uid}${cUser.uid}`));
      } else {
         dispatch(setConnectionId(`${cUser.uid}${user.uid}`));
      }
   };

   return (
      <ul>
         <li
            onClick={handleClick}
            className="flex justify-between items-center py-2 px-5 cursor-pointer"
         >
            <p className="text-base font-semibold text-left text-[#495057]">
               {cUser.username}
            </p>
            <span className="text-[#7a7f9a]">
               <i className="ri-more-2-fill"></i>
            </span>
         </li>
      </ul>
   );
};

export default ContactItem;
