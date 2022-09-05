import React from "react";
import { useSelector } from "react-redux";
import Loading from "../layouts/Loading";

const Profile = () => {
   const { user } = useSelector((state) => state.user);

   return (
      <div className="profile pt-6 px-6 mx-1 h-full overflow-auto scrollbar-border scrollbar-current scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:scrollbar-thumb-slate-300 tablet:dark:scrollbar-thumb-slate-500">
         {/* my profile */}
         <div className="flex justify-between items-start">
            <h4 className="h4-size dark:text-[#e1e9f1] transition-colors duration-300">
               My Profile
            </h4>
            <span className="flex items-center text-[#7a7f9a] text-[18px] leading-7 text-center dark:text-[#9aa1b9] transition-colors duration-150">
               <i className="ri-more-2-fill"></i>
            </span>
         </div>

         {/* profile photo & status */}
         {user ? (
            <>
               <div className="text-[#495057] text-[15px] leading-[22.5px] p-6 text-center">
                  <div className="avatar rounded-full mb-6">
                     <img
                        src={user.avatar}
                        className="rounded-full p-1 w-24 h-24 mx-auto border-[#f0eff5] dark:border-[#36404a] transition-colors duration-300 border-[1px]"
                        alt="my-avatar"
                     />
                  </div>
                  <h5 className="font-semibold leading-5 mb-1 tracking-wider dark:text-[#e1e9f1] transition-colors duration-300">
                     {user.username}
                  </h5>
                  <p className="flex items-center justify-center gap-1 text-[#7a7f9a] dark:text-[#9aa1b9] font-medium">
                     <i className="ri-record-circle-fill text-[10px] leading-4 text-[#06d6a0]"></i>
                     {user.isActive.content}
                  </p>
               </div>

               {/* profile content */}
               <div className="text-[#495057] leading-[22.5px] my-6">
                  <div className="flex justify-between items-start text-[#7a7f9a] dark:text-[#9aa1b9] text-[15px] mb-6 gap-1.5 transition-colors duration-300">
                     <p className="tracking-normal">
                        lorem ipsum haha drer kcekt Lorem ipsum dolor sit amet
                        consectetur adipisicing elit. Quam non ducimus dolore,
                        voluptatum odio voluptas. Hic odit sapiente.
                     </p>
                     <span className="cursor-pointer text-[15px]">
                        <i className="ri-pencil-line"></i>
                     </span>
                  </div>
                  {/* card */}
                  <div className="card bg-white dark:bg-[#262E35] dark:text-[#e1e9f1] transition-colors duration-[350ms] rounded text-[15px] px-5">
                     <h5 className="text-[#212529] dark:text-[#eff2f7] flex items-center gap-2 font-semibold py-3 transition-colors duration-300">
                        <i className="ri-user-2-line text-sm leading-4"></i>
                        About
                     </h5>
                     <div className="card-body py-5 flex flex-col gap-3">
                        <div>
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Name
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              {user.username}
                           </h5>
                        </div>
                        <div className="break-words overflow-hidden whitespace-normal text-ellipsis">
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Email
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              {user.email}
                           </h5>
                        </div>
                        <div>
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Last Sign In
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              {user.lastSignInTime}
                           </h5>
                        </div>
                        <div>
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Location
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              Azerbaijan
                           </h5>
                        </div>
                     </div>
                  </div>
               </div>
            </>
         ) : (
            <Loading />
         )}
      </div>
   );
};

export default Profile;
