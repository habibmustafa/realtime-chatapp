import React from "react";

export const LogInput = ({ label, children, icon, forgot = false, ...props }) => {
   return (
      <div className="mb-4 relative">
         <label className="mb-2 block font-semibold" htmlFor={label}>
            {children}
         </label>
         {forgot && (
            <a href="%" className="absolute top-0 right-0 text-sm">
               Forgot password?
            </a>
         )}
         <div className="w-full mx-auto flex border-[1px] rounded-sm ">
            <span className="px-[15px] py-3 text-sm text-slate-500 bg-slate-100 flex items-center justify-center">
               <i className={icon}></i>
            </span>
            <input
               type={label}
               id={label}
               className="w-full px-4 outline-0 border-0 text-sm font-medium"
               {...props}
            />
         </div>
      </div>
   );
};
