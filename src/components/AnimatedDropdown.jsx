import { ref, remove } from "firebase/database";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { messagesDB } from "../firebaseCongif/messagesDB";

const AnimatedDropdown = ({ message, align }) => {
   const [open, setOpen] = useState(false);
   const animRef = useRef();
   const buttonRef = useRef();
   const { connectionId } = useSelector((state) => state.message);
   const { user } = useSelector((state) => state.user);

   const handleDelete = () => {
      setOpen(false);
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
         if (open && animRef.current && !animRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
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
         <button ref={buttonRef} onClick={() => {setOpen(!open)}} className="w-4">
            <i className="ri-more-2-fill"></i>
         </button>
         {open && (
            <ul
               ref={animRef}
               className={`w-[150px] select-none absolute z-10 bg-white dark:bg-[#313a43] text-[15px] rounded py-2 mt-1 mx-1.5 box-shadow text-[#212529] dark:text-[#939BB1] clear-both font-medium ${align}
             ${open ? "openAnimation" : " closeAnimation"}
         `}
            >
               <li
                  onClick={() => {
                     navigator.clipboard.writeText(message.message.text);
                     setOpen(false);
                     toast.success("Successfully Copied!", {className:"bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]"});
                  }}
                  className="flex justify-between items-center px-6 py-1.5 cursor-pointer hover:bg-[#f7f7ff] dark:hover:bg-[#36404a] dark:hover:text-[#DFE1E2]"
               >
                  Copy <i className="ri-file-copy-line text-[#7a7f9a]"></i>
               </li>
               <li className="flex justify-between items-center px-6 py-1.5 cursor-pointer hover:bg-[#f7f7ff] dark:hover:bg-[#36404a] dark:hover:text-[#DFE1E2]">
                  Save <i className="ri-save-line text-[#7a7f9a]"></i>
               </li>
               <li className="flex justify-between items-center px-6 py-1.5 cursor-pointer hover:bg-[#f7f7ff] dark:hover:bg-[#36404a] dark:hover:text-[#DFE1E2]">
                  Forward{" "}
                  <i className="ri-chat-forward-line text-[#7a7f9a]"></i>
               </li>
               <li
                  onClick={handleDelete}
                  className={`flex justify-between items-center px-6 py-1.5 cursor-pointer hover:bg-[#f7f7ff] dark:hover:bg-[#36404a] dark:hover:text-[#DFE1E2] ${
                     message.sender !== user.uid && "opacity-50"
                  }`}
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
