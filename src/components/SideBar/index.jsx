import Chats from "./Chats";
import { useState } from "react";
import { logOut } from "../../firebaseCongif/auth";
import Contacts from "./Contacts";
import { set, ref } from "firebase/database";
import { usersDB } from "../../firebaseCongif/usersDB";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import Settings from "./Settings";

const SideBar = () => {
   const [darkMode, setDarkMode] = useState(
      localStorage.theme === "dark" ? true : false
   );
   const [button, setButton] = useState({
      item: [
         {
            id: 1,
            name: "ri-user-2-line",
         },
         {
            id: 2,
            name: "ri-message-3-line",
         },
         {
            id: 3,
            name: "ri-group-line",
         },
         {
            id: 4,
            name: "ri-settings-2-line",
         },
      ],
      active: 2,
   });
   
   const { user } = useSelector((state) => state.user);

   // !theme change
   const handleChangeTheme = () => {
      setDarkMode(!darkMode);
      if (localStorage.theme === "light") {
         document.querySelector("html").classList.add("dark");
         localStorage.setItem("theme", "dark");
      } else {
         document.querySelector("html").classList.remove("dark");
         localStorage.setItem("theme", "light");
      }
   };

   // !logout
   const handleLogOut = async () => {
      await logOut();
      set(ref(usersDB, `users/${user.uid}/isActive`), {
         status: false,
         content: `Last seen: ${new Date().toString().substring(4, 21)}`,
      });
   };

   return (
      <div className="sidebar flex h-full tablet:flex-col-reverse tablet:w-full">
         {/* sidemenu */}
         <div className="sidemenu bg-white dark:bg-[#36404A] box-shadow transition-colors duration-300 relative z-20 w-[75px] h-full flex flex-col justify-between items-center p-4 tablet:w-full tablet:p-1 tablet:h-[61px] tablet:flex-row">
            {/* logo */}
            <div className="flex items-center gap-1 text-3xl text-[#7269ef] dark:text-[#6159cb] cursor-pointer tablet:hidden">
               <i className="ri-chat-smile-2-fill"></i>
            </div>

            {/* center nav */}
            <div className="flex flex-col gap-2 tablet:gap-0 tablet:flex-row tablet:justify-around tablet:w-full">
               {button.item.map((icon) => (
                  <button
                     key={icon.id}
                     onClick={() => {
                        setButton({ ...button, active: icon.id });
                     }}
                     className={`text-2xl text-[#878a82] dark:text-[#a6b0cf] transition-colors duration-[250ms] px-4 inline-block rounded-lg py-3 cursor-pointer tablet:text-xl tablet:px-5 tablet:py-2.5 ${
                        icon.id === button.active &&
                        "bg-[#f7f7ff] !text-[#7269ef] dark:bg-[#3e4a56]"
                     } ${icon.id === 4 && "tablet:hidden"}`}
                  >
                     <i className={icon.name}></i>
                  </button>
               ))}
               <button
                  title="Dark / Light Mode"
                  onClick={handleChangeTheme}
                  className="text-2xl px-4 hidden rounded-lg py-2 my-2 text-[#878a82] dark:text-[#a6b0cf] cursor-pointer tablet:text-xl tablet:px-5 tablet:my-0 tablet:py-2.5 tablet:inline-block"
               >
                  <i
                     className={`${darkMode ? "ri-sun-line" : "ri-moon-line"}`}
                  ></i>
               </button>
               <button
                  onClick={handleLogOut}
                  className="text-2xl px-4 hidden rounded-lg py-2 cursor-pointer text-[#878a82] dark:text-[#a6b0cf] tablet:text-xl tablet:px-5 tablet:py-2.5 tablet:inline-block"
               >
                  <i className="ri-logout-box-line"></i>
               </button>
            </div>

            {/* bottom nav */}
            <div className="tablet:hidden">
               <button
                  title="Dark / Light Mode"
                  onClick={handleChangeTheme}
                  className="text-2xl px-4 inline-block rounded-lg py-2 my-2 text-[#878a82] dark:text-[#a6b0cf] cursor-pointer tablet:text-xl tablet:px-7 tablet:my-0 tablet:py-2.5"
               >
                  <i
                     className={`${darkMode ? "ri-sun-line" : "ri-moon-line"}`}
                  ></i>
               </button>
               <button
                  onClick={handleLogOut}
                  className="text-2xl px-4 inline-block rounded-lg py-2 my-2 text-[#878a82] dark:text-[#a6b0cf] cursor-pointer"
               >
                  <i className="ri-logout-box-line"></i>
               </button>
            </div>
         </div>

         {/* sidechange */}
         <div className="sidechange w-96 bg-[#f5f7fb] h-full dark:bg-[#303841] box-shadow relative z-10 transition-colors duration-[350ms] tablet:w-full tablet:h-[calc(100%-61px)]">
            {button.active === 1 && <Profile />}
            {button.active === 2 && <Chats />}
            {button.active === 3 && <Contacts />}
            {button.active === 4 && <Settings />}
         </div>
      </div>
   );
};

export default SideBar;
