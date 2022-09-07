import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../layouts/Loading";
import { setViewProfile } from "../store/animSlice";

const ViewProfile = () => {
   const { chatUser } = useSelector((state) => state.user);
   const { viewProfile } = useSelector((state) => state.anim);
   const dispatch = useDispatch();
   const ref = useRef();

   useEffect(() => {
      const checkIfClickedOutside = (e) => {
         if (
            viewProfile &&
            ref.current &&
            !ref.current.contains(e.target) &&
            window.innerWidth <= 991
         ) {
            dispatch(setViewProfile(false));
         }
      };
      document.addEventListener("mousedown", checkIfClickedOutside);
      return () => {
         document.removeEventListener("mousedown", checkIfClickedOutside);
      };
   }, [viewProfile]);

   return (
      <div
         ref={ref}
         className="view-profile w-96 h-full p-6 pb-0 absview:absolute absview:right-0 absview:z-30 mobile:w-full tablet:h-[calc(100%-77px)] tablet:border-l-2 mobile:h-full mobile:border-none tablet:px-5 tablet:pt-4 bg-white dark:bg-[#262E35] border-l-4 border-[#F0EFF5] dark:border-[#36404A] transition-colors duration-[400ms] overflow-auto scrollbar-border scrollbar-current scrollbar-thumb-transparent hover:scrollbar-thumb-slate-300 dark:hover:scrollbar-thumb-slate-500 tablet:scrollbar-thumb-slate-300 tablet:dark:scrollbar-thumb-slate-500"
      >
         {/* Cancel */}
         {chatUser ? (
            <>
               <div className="text-[#7a7f9a] text-xl text-right">
                  <i
                     onClick={() => {
                        dispatch(setViewProfile(false));
                     }}
                     tabIndex="15"
                     className="ri-close-line w-10 h-10 text-center leading-10 inline-block cursor-pointer tablet:text-right focus:scale-90"
                  ></i>
               </div>

               {/* profile photo & status */}
               <div className="text-[#495057] text-[15px] leading-[22.5px] p-6 tablet:pt-1 text-center border-[#f0eff5] dark:border-[#36404a] transition-colors duration-[350ms] border-b-[1px]">
                  <div className="avatar rounded-full mb-6">
                     <img
                        src={chatUser.avatar}
                        className="rounded-full p-1 w-24 h-24 mx-auto border-[#f0eff5] dark:border-[#36404a] transition-colors duration-300 border-[1px]"
                        alt="my-avatar"
                     />
                  </div>
                  <h5 className="font-semibold leading-5 mb-1 tracking-wider dark:text-[#e1e9f1] transition-colors duration-300">
                     {chatUser.username}
                  </h5>
                  <p className="flex items-center justify-center gap-1 text-[#7a7f9a] dark:text-[#9aa1b9] font-medium">
                     <i
                        className={`ri-record-circle-fill text-[10px] leading-4 ${
                           chatUser.isActive.status
                              ? "text-[#06d6a0]"
                              : "text-red-500"
                        }`}
                     ></i>
                     {chatUser.isActive?.content}
                  </p>
               </div>

               {/* profile content */}
               <div className="text-[#495057] leading-[22.5px] my-6">
                  <div className="text-[#7a7f9a] dark:text-[#9aa1b9] text-[15px] mb-6 transition-colors duration-300">
                     <p className="tracking-normal">
                        {chatUser.bio}
                     </p>
                  </div>
                  {/* card */}
                  <div className="card bg-white dark:bg-[#262E35] dark:text-[#e1e9f1] border-[#f0eff5] dark:border-[#36404a] border-[1px] transition-colors duration-[350ms] rounded text-[15px]">
                     <h5 className="text-[#212529] dark:text-[#eff2f7] dark:bg-[#36404a] flex items-center gap-2 font-semibold py-3 transition-colors duration-[400ms] px-5">
                        <i className="ri-user-2-line text-sm leading-4"></i>
                        About
                     </h5>
                     <div className="card-body p-5 flex flex-col gap-3">
                        <div>
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Name
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              {chatUser.username}
                           </h5>
                        </div>
                        <div className="break-words overflow-hidden whitespace-normal text-ellipsis">
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Email
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              {chatUser.email}
                           </h5>
                        </div>
                        <div>
                           <p className="text-[#7a7f9a] dark:text-[#9aa1b9] mb-1">
                              Last Sign In
                           </p>
                           <h5 className="text-sm mb-2 font-semibold tracking-wide">
                              {chatUser.lastSignInTime}
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

export default ViewProfile;
