import React, { useState } from "react";
import { useSelector } from "react-redux";
import ContactItem from "./ContactItem";

const Contacts = () => {
   const [search, setSearch] = useState("");
   const {allUsers} = useSelector(state => state.user)

   // useEffect(() => {
   //    onValue(ref(usersDB, "users/"), (snapshot) => {
   //       const data = snapshot.val();
   //       if (data !== null) {
   //          // helelik
   //          setAllUsers(
   //             Object.values(data)
   //                .filter(
   //                   (item) => item.uid !== JSON.parse(localStorage.user).uid
   //                )
   //                .sort((a, b) => a.createdAt - b.createdAt)
   //          );
   //       }
   //    });
   //    return () => {
   //       setAllUsers([]);
   //    };
   // }, []);

   return (
      <div className="contact py-6 px-7">
         <div className="mb-16">
            <div className="flex justify-between items-start">
               <h4 className="h4-size  mb-6">Contacts</h4>
               <span className="flex items-center text-[#7a7f9a] text-[18px] leading-7 text-center px-4">
                  <i className="ri-user-add-line"></i>
               </span>
            </div>
            {/* search */}
            <div className="w-[333px] h-11 bg-[#e6ebf5] flex items-center rounded-[6.4px] mb-6 tablet:w-full">
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
                  className="w-full h-full bg-inherit text-[#495057] py-2 font-medium px-3 text-sm leading-5 rounded-[6.4px] outline-none"
               />
            </div>
         </div>

         <div className="all-users">
            {allUsers &&
            allUsers.map((cUser) => (
               <ContactItem key={cUser.uid} cUser={cUser} />
            ))}

         </div>
      </div>
   );
};

export default Contacts;
