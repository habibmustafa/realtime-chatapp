import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { updateDisplayName } from "../firebaseCongif/auth";
import { updateBioq, updateUsername } from "../firebaseCongif/usersDB";
import Loading from "../layouts/Loading";

const Profile = () => {
   const [editName, setEditName] = useState(false);
   const [editBio, setEditBio] = useState(false);
   const { user } = useSelector((state) => state.user);
   const [nameValue, setNameValue] = useState(user.username);
   const [bioValue, setBioValue] = useState(user.bio);

   const updateName = async () => {
      if (nameValue.length < 3) {
         toast.error("Minimum of 3 characters!", {
            className:
               "bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]",
         });
         return false;
      }
      if (nameValue === user.username) {
         toast.error("Change your name!", {
            className:
               "bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]",
         });
         return false;
      }
      await updateDisplayName(nameValue);
      updateUsername(user.uid, nameValue);
      toast.success("Your name has been updated!", {
         className:
            "bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]",
      });
      setEditName(false);
   };

   const updateBio = () => {
      if (!editBio) {
         setEditBio(true);
         return false;
      }

      if (!bioValue) {
         toast.error("The bio was not changed!", {
            className:
               "bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]",
         });
         setEditBio(false);
         return false;
      }
      if (bioValue === user.bio) {
         toast.error("Change your bio!", {
            className:
               "bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]",
         });
         return false;
      }
      updateBioq(user.uid, bioValue);
      toast.success("Your bio has been updated!", {
         className:
            "bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]",
      });
      setEditBio(false);
   };

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

         {user ? (
            <>
               {/* profile photo & status */}
               <div className="text-[#495057] text-[15px] leading-[22.5px] p-6 text-center border-[#f0eff5] dark:border-[#36404a] border-b-[1px] transition-colors duration-[350ms]">
                  <div className="avatar rounded-full mb-6 relative w-24 h-24 mx-auto">
                     <img
                        src={user.avatar}
                        className="rounded-full p-1  border-[#f0eff5] dark:border-[#36404a] transition-colors duration-300 border-[1px]"
                        alt="my-avatar"
                     />
                     <Link
                        to="/setAvatar"
                        className="absolute flex items-center justify-center right-0 w-[35px] h-[35px] transition-colors duration-300 box-shadow bg-[#e6ebf5] rounded-full text-[#212529] dark:bg-[#36404a] dark:text-[#e6ebf5] text-[15px] leadi-[22.5px] text-center bottom-0"
                     >
                        <i className="ri-pencil-fill"></i>
                     </Link>
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
                     {!editBio ? (
                        <p className="tracking-normal px-2 py-1">{user.bio}</p>
                     ) : (
                        <textarea
                           value={bioValue}
                           onChange={(e) => {
                              setBioValue(e.target.value);
                           }}
                           className="bg-white dark:bg-[#262E35] px-2 py-1 rounded scrollbar-current outline-none resize-none w-full h-[90px] scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:scrollbar-thumb-slate-300 tablet:dark:scrollbar-thumb-slate-500"
                        ></textarea>
                     )}
                     <span
                        onClick={updateBio}
                        className="cursor-pointer text-lg inline-block active:scale-95"
                     >
                        <i className="ri-pencil-line"></i>
                     </span>
                  </div>
                  {/* card */}
                  <div className="card bg-white dark:bg-[#262E35] dark:text-[#e1e9f1] border border-[#f0eff5] dark:border-[#36404a] transition-colors duration-[350ms] rounded text-[15px]">
                     <h5 className="text-[#212529] dark:text-[#eff2f7] dark:bg-[#36404a] flex items-center gap-2 font-semibold py-3 px-5 transition-colors duration-[350ms]">
                        <i className="ri-user-2-line text-sm leading-4"></i>
                        About
                     </h5>
                     <div className="card-body p-5 flex flex-col gap-3">
                        <div>
                           <div className="flex justify-between items-center">
                              <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                                 Name
                              </p>
                              {editName || (
                                 <button
                                    onClick={() => {
                                       setEditName(true);
                                    }}
                                    className="flex items-center justify-center gap-1 select-none bg-[#e6ebf5] hover:bg-[#e6eef9] rounded text-[#212529] text-[13px] leading-5 w-16 h-[30px] dark:bg-[#36404a] dark:hover:bg-[#313a43] dark:text-[#eff2f7] active:scale-[0.98] transition-colors duration-[350ms]"
                                 >
                                    <i className="ri-edit-fill"></i>
                                    <span>Edit</span>
                                 </button>
                              )}
                           </div>

                           {/* edit name */}
                           {!editName ? (
                              <h5 className="text-sm mb-2 font-semibold tracking-wide">
                                 {user.username}
                              </h5>
                           ) : (
                              <div className="flex justify-between text-sm font-semibold tracking-wide transition-colors duration-[350ms] bg-transparent border border-[#f0eff5] dark:border-[#36404a] rounded w-full">
                                 <input
                                    value={nameValue}
                                    onChange={(e) => {
                                       setNameValue(e.target.value);
                                    }}
                                    type="text"
                                    className="bg-inherit outline-none w-full h-full px-2 py-1.5"
                                 />
                                 <button
                                    onClick={() => {
                                       setEditName(false);
                                    }}
                                    className="w-12 h-[30px] flex justify-center items-center text-lg bg-transparent transition-colors duration-300"
                                 >
                                    <i className="ri-close-line"></i>
                                 </button>
                                 <button
                                    onClick={updateName}
                                    className="w-12 h-[30px] flex justify-center items-center bg-[#F5F7FB] dark:bg-[#303841] transition-colors duration-300"
                                 >
                                    <i className="ri-send-plane-line"></i>
                                 </button>
                              </div>
                           )}
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
