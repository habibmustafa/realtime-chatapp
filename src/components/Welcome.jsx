import React from "react";
// import Nochat from "../assets/welcome.gif";

export const Welcome = () => {
   return (
      <div className="flex justify-center items-center flex-col h-full ">
         {/* helelik */}
         {/* <div className="overflow-hidden max-w-[650px] max-h-[650px]">
            <img className="object-fit scale-150" src={Nochat} alt="no-chat" />
         </div> */}
         <div className="">
            <h2 className="font-bold text-3xl text-zinc-800 dark:text-[#e1e9f1] transition-colors duration-300 mb-5">
               It's a nice to chat with someone
            </h2>
            <p className="text-xl text-zinc-700 text-center dark:text-[#abb4d2] transition-colors duration-300">
               Pick a person from left menu <br /> and start your conversation
            </p>
         </div>
      </div>
   );
};
