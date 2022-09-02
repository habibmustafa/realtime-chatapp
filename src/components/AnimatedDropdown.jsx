import { ref, set } from "firebase/database";
import { useState } from "react";
import UnopDropdown from "unop-react-dropdown";

const AnimatedDropdown = ({message, align}) => {
   const [open, setOpen] = useState(false);

   const handler = () => {
      setOpen(!open);
   };

   const handleDelete = () => {
      console.log(message);
   }

   return (
      <UnopDropdown
         onAppear={handler}
         onDisappearStart={handler}
         delay={300}
         align={align}
         trigger={<i className="ri-more-2-fill"></i>}
      >
         <ul
            tabIndex="-1"
            className={`w-[150px] select-none bg-white text-[15px] rounded py-2 mr-2 mt-1 box-shadow text-[#212529] clear-both font-medium
            openAnimation ${!open ? " closeAnimation" : ""}
         `}
         >
            <li
               tabIndex="0"
               className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
            >
               Copy <i className="ri-file-copy-line text-[#7a7f9a]"></i>
            </li>
            <li
               tabIndex="0"
               className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
            >
               Save <i className="ri-save-line text-[#7a7f9a]"></i>
            </li>
            <li
               tabIndex="0"
               className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
            >
               Forward <i className="ri-chat-forward-line text-[#7a7f9a]"></i>
            </li>
            <li
               onClick={handleDelete}
               tabIndex="0"
               className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
            >
               Delete <i className="ri-delete-bin-line text-[#7a7f9a]"></i>
            </li>
         </ul>
      </UnopDropdown>

      // <>
      //    <button
      //       id="dropdownDividerButton"
      //       data-dropdown-toggle="dropdownDivider"
      //       className="focus:ring-4 focus:outline-none focus:ring-blue-300"
      //    >
      //       <i className="ri-more-2-fill "></i>
      //    </button>
      //    <div
      //       id="dropdownDivider"
      //       className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
      //    >
      //       <ul
      //          aria-labelledby="dropdownDividerButton"
      //          className={`w-[150px] bg-white text-[15px] rounded py-2 mr-2 mt-1 box-shadow text-[#212529] clear-both font-medium
      //             openAnimation ${!open ? " closeAnimation" : ""}
      //          `}
      //       >
      //          <li
      //             className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
      //          >
      //             Copy <i className="ri-file-copy-line text-[#7a7f9a]"></i>
      //          </li>
      //          <li
      //             className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
      //          >
      //             Save <i className="ri-save-line text-[#7a7f9a]"></i>
      //          </li>
      //          <li
      //             className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
      //          >
      //             Forward{" "}
      //             <i className="ri-chat-forward-line text-[#7a7f9a]"></i>
      //          </li>
      //          <li
      //             className="flex justify-between items-center px-6 py-2 hover:bg-[#f7f7ff]"
      //          >
      //             Delete <i className="ri-delete-bin-line text-[#7a7f9a]"></i>
      //          </li>
      //       </ul>
      //    </div>
      // </>
   );
};

export default AnimatedDropdown;
