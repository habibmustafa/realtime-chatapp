import { ref, remove } from "firebase/database";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { messagesDB } from "../firebaseCongif/messagesDB";

const AnimatedDropdown = ({ message, align }) => {
   const [open, setOpen] = useState(false);
   const animRef = useRef();
   const { connectionId } = useSelector((state) => state.message);
   const { user } = useSelector((state) => state.user);

   const handler = () => {
      setOpen(!open);
   };

   const handleDelete = () => {
      setOpen(false)
      message.sender === user.uid &&
         remove(
            ref(
               messagesDB,
               `connection/${connectionId}/messages/${message.uuid}`
            )
         );
   };

   useEffect(() => {
      const checkIfClickedOutside = (e) => {
         if (open && animRef.current && !animRef.current.contains(e.target)) {
            setOpen(false);
         }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, [open]);

   return (
      <>
         <button onClick={handler} className="w-4">
            <i className="ri-more-2-fill"></i>
         </button>
         {open && (
            <ul ref={animRef}
               className={`w-[150px] select-none absolute z-10 bg-white text-[15px] rounded py-2 mt-1 mx-1.5 box-shadow text-[#212529] clear-both font-medium ${align}
             ${open ? "openAnimation" : " closeAnimation"}
         `}
            >
               <li
                  tabIndex="1"
                  className="flex justify-between items-center px-6 py-2 cursor-pointer hover:bg-[#f7f7ff]"
               >
                  Copy <i className="ri-file-copy-line text-[#7a7f9a]"></i>
               </li>
               <li
                  tabIndex="1"
                  className="flex justify-between items-center px-6 py-2 cursor-pointer hover:bg-[#f7f7ff]"
               >
                  Save <i className="ri-save-line text-[#7a7f9a]"></i>
               </li>
               <li
                  tabIndex="1"
                  className="flex justify-between items-center px-6 py-2 cursor-pointer hover:bg-[#f7f7ff]"
               >
                  Forward{" "}
                  <i className="ri-chat-forward-line text-[#7a7f9a]"></i>
               </li>
               <li
                  tabIndex="1"
                  onClick={handleDelete}
                  className="flex justify-between items-center px-6 py-2 cursor-pointer hover:bg-[#f7f7ff]"
               >
                  Delete <i className="ri-delete-bin-line text-[#7a7f9a]"></i>
               </li>
            </ul>
         )}
      </>

      // <UnopDropdown
      //    onAppear={handler}
      //    onDisappearStart={handler}
      //    // delay={300}
      //    align={align}
      //    trigger={
      //       <button ref={animRef} className="w-4">
      //          <i className="ri-more-2-fill"></i>
      //       </button>
      //    }
      // >
      //    <ul
      //       className={`w-[150px] select-none bg-white text-[15px] rounded py-2 mr-2 mt-1 box-shadow text-[#212529] clear-both font-medium
      //        ${open ? "openAnimation" : " closeAnimation"}
      //    `}
      //    >
      //       <li className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]">
      //          Copy <i className="ri-file-copy-line text-[#7a7f9a]"></i>
      //       </li>
      //       <li className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]">
      //          Save <i className="ri-save-line text-[#7a7f9a]"></i>
      //       </li>
      //       <li className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]">
      //          Forward <i className="ri-chat-forward-line text-[#7a7f9a]"></i>
      //       </li>
      //       <li
      //          onClick={handleDelete}
      //          className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
      //       >
      //          Delete <i className="ri-delete-bin-line text-[#7a7f9a]"></i>
      //       </li>
      //    </ul>
      // </UnopDropdown>
   );
};

export default AnimatedDropdown;