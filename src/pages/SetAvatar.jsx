import React, { useState } from "react";
// import axios from "axios";
// import { Buffer } from "buffer";
import { userSetAvatar } from "../firebaseCongif/usersDB";
import { auth } from "../firebaseCongif/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SetAvatar = () => {
   const [user, loading, error] = useAuthState(auth);
   const api = `https://api.multiavatar.com`;
   const [activeAvatar, setActiveAvatar] = useState(false);
   const [avatars] = useState([
      `${api}/4857.svg`,
      `${api}/48457.svg`,
      `${api}/4835.svg`,
      `${api}/4827.svg`,
      `${api}/48517.svg`,
      `${api}/4842157.svg`,
      `${api}/484435.svg`,
      `${api}/48297.svg`,
   ]);

   // useEffect(() => {
   //    for (let i = 0; i < 8; i++) {
   // const image = await axios.get(`${api}${Math.round(Math.random() * 100000)}`)
   // const buffer = new Buffer(image.data);
   // newArray.push(buffer.toString("base64"));
   // fetch(
   //    "https://api.multiavatar.com/" +
   //       JSON.stringify(Math.round(Math.random() * 1000)) +
   //       "?apikey=O7TvK29xXwksMb"
   // )
   //    .then((res) => res.text())
   //    .then((svg) => setAvatars(prev => [...prev, svg.toString('base64')]));
   // newArray.push(image)
   // }
   // console.log(newArray );
   // setAvatars(newArray);
   // }, []);
   const navigate = useNavigate();

   const setImage = (i) => {
      setActiveAvatar(i);
   };

   const handleClick = () => {
      if (loading) return;
      if (user && activeAvatar !== false) {
         userSetAvatar(user.uid, avatars[activeAvatar]);
         navigate("/");
      }
      else {
         toast.error("Select an Avatar!", {className:"bg-white text-[#212529] dark:bg-[#313a43] dark:text-[#f7f7ff]"})
      }
   };

   console.log(avatars);
   console.log(activeAvatar);

   return (
      <div className="setAvatar h-full flex flex-col px-6 justify-center items-center gap-10 dark:bg-[#262E35] mobile:gap-8">
         <h1 className="text-[32px] font-bold text-[#495057] text-center dark:text-[#e1e9f1] mobile:text-2xl">
            Pick an Avatar as your profile picture
         </h1>
         <div className="grid grid-cols-4 gap-6 mobile:grid-cols-2 mobile:gap-4">
            {avatars &&
               avatars.map((avatar, i) => (
                  <div
                     key={i}
                     onClick={() => setImage(i)}
                     className="w-24 mobile:w-20 rounded-full cursor-pointer transition hover:-translate-y-1 mobile:hover:-translate-y-0"
                  >
                     <img
                        src={`${avatar}`}
                        alt="avatar"
                        className={`w-full transition duration-[350ms] rounded-full p-1 ${
                           activeAvatar === i &&
                           " scale-110 border-4 border-blue-600"
                        }`}
                     />
                  </div>
               ))}
         </div>
         <button
            onClick={handleClick}
            className="uppercase px-8 py-4 transition-all box-shadow bg-[#7269ef] hover:bg-[#6159cb] text-white font-bold rounded-md mobile:text-sm mobile:px-6 mobile:py-3"
         >
            Set as Profile Picture
         </button>
      </div>
   );
};

export default SetAvatar;
