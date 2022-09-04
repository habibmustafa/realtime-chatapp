import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";

const Contacts = () => {
   const [search, setSearch] = useState("");
   const { allUsers } = useSelector((state) => state.user);

   return (
      <div className="contact py-6 px-7">
         <div className="mb-12">
            <div className="flex justify-between items-start">
               <h4 className="h4-size  mb-6 dark:text-[#e1e9f1] transition-colors duration-300">Contacts</h4>
               <span className="flex items-center text-[#7a7f9a] text-[18px] leading-7 text-center px-4 dark:text-[#9aa1b9] transition-colors duration-150">
                  <i className="ri-user-add-line"></i>
               </span>
            </div>
            {/* search */}
            <div className="w-[333px] h-11 bg-[#e6ebf5] flex items-center rounded-[6.4px] mb-6 tablet:w-full dark:bg-[#36404a] transition-colors duration-300">
               <span className="flex items-center justify-center ml-2 w-9 h-full">
                  <i className="ri-search-line search-icon text-lg leading-7 text-[#7a7f9a]"></i>
               </span>
               <input
                  type="search"
                  onChange={(e) => {
                     setSearch(e.target.value);
                  }}
                  value={search}
                  placeholder="Search users.."
                  className="w-full h-full bg-inherit text-[#495057] dark:text-[#a6b0cf] py-2 font-medium px-3 text-sm leading-5 rounded-[6.4px] outline-none"
               />
            </div>
         </div>

         <div className="all-users max-h-[665px] overflow-auto scrollbar-border scrollbar-thin scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:max-h-[620px]">
            {allUsers &&
               allUsers
                  .filter(
                     (name) =>
                        !name.username
                           .toLowerCase()
                           .indexOf(search.toLowerCase()) || search === ""
                  )
                  .map((cUser, index) => (
                     <ContactItem key={cUser.uid} cUser={cUser} index={index} />
                  ))}
         </div>
      </div>
   );
};

export default Contacts;
