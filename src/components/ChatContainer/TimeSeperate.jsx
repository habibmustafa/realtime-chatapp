const TimeSeperate = ({message, i, thisMessages}) => {
   return (
      <>
         {/* first */}
         {!i && message.time && (
            <div className="w-full h-[1px] bg-[#f0eff5] dark:bg-[#36404a] transition-colors duration-[350ms] text-[15px] text-center mb-14 relative tablet:mb-12">
               <span className="bg-[#f0eff5] transition-colors duration-[350ms] dark:bg-[#36404a] rounded-md text-[13px] leading-5 py-1.5 px-3 text-center text-[#495057] dark:text-[#a6b0cf] absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {new Date().toString().substring(4, 15) ===
                  message.time.substring(4, 15)
                     ? `Today`
                     : `${message.time.substring(
                          8,
                          11
                       )} ${message.time.substring(
                          4,
                          7
                       )}, ${message.time.substring(11, 15)}`}
               </span>
            </div>
         )}

         {/* other */}
         {i > 0 &&
            message.time &&
            thisMessages[i - 1].time?.substring(0, 15) !==
               message.time?.substring(0, 15) && (
               <div className="w-full h-[1px] bg-[#f0eff5] dark:bg-[#36404a] transition-colors duration-[350ms] leading-[22.5px] text-center mb-14 mt-11 relative tablet:mb-12">
                  <span className="bg-[#f0eff5] transition-colors duration-[350ms] dark:bg-[#36404a] rounded-md text-[13px] leading-5 py-1.5 px-3 text-center text-[#495057] dark:text-[#a6b0cf] absolute -top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                     {new Date().toString().substring(4, 15) ===
                     message.time.substring(4, 15)
                        ? `Today`
                        : `${message.time.substring(
                             8,
                             11
                          )} ${message.time.substring(
                             4,
                             7
                          )}, ${message.time.substring(11, 15)}`}
                  </span>
               </div>
            )}
      </>
   );
};

export default TimeSeperate;
