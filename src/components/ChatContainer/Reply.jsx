import { useDispatch, useSelector } from "react-redux";
import { replyMessage } from "../../firebaseCongif/messagesDB";
import { setReply } from "../../store/animSlice";

const Reply = () => {
   const { reply } = useSelector((state) => state.anim);
   const dispatch = useDispatch();

   return (
      <div
         className={`w-full px-6 py-3 tablet:px-2.5 tablet:py-2 bg-[#E6EBF5] dark:bg-[#36404A] text-[#212529] dark:text-[#eff2f7] flex items-center justify-between transition-all duration-300 relative ${
            reply ? "-mt-0 translate-y-0" : "-mt-14 tablet:-mt-12 translate-y-full"
         }`}
      >
         <div className="flex gap-2 items-center text-[15px]">
            <span className="text-xl tablet:text-base">
               <i className="ri-reply-line"></i>
            </span>
            <div className="">{reply.message}</div>
         </div>
         <div
            onClick={() => {
               replyMessage(reply.connectionId, reply.uuid)
               dispatch(setReply(false));
            }}
            className="text-xl cursor-pointer mr-4 tablet:mr-2.5"
         >
            <i className="ri-close-line"></i>
         </div>
      </div>
   );
};

export default Reply;
