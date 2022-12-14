import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogInput from "../components/LogInput";
import { auth, register } from "../firebaseCongif/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { addUser } from "../firebaseCongif/usersDB";
import { useDispatch } from "react-redux";
import { setChatUser, setChatUserId } from "../store/userSlice";
import { toast } from "react-hot-toast";

const Register = () => {
   const [email, setEmail] = useState("");
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [user, loading] = useAuthState(auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   // !register check
   const handleSubmit = async (e) => {
      e.preventDefault();
      // !characters length
      if (username.length < 3 || username.length > 16) {
         toast.error("min 3, max 16 characters!");
         return false;
      }

      // !space check
      if(username.indexOf("  ") !== -1) {
         toast.error("Only 1 space!");
         return false;
      }

      await register(email, password, username);
   };

   // !register success?go main page
   useEffect(() => {
      if (loading) return;
      if (user) {
         addUser(
            user.uid,
            user.email,
            username,
            user.metadata.createdAt,
            user.metadata.lastSignInTime.substring(0, 16)
         );
         dispatch(setChatUserId(false));
         dispatch(setChatUser(false));
         navigate("/setAvatar");
      }
   }, [user, loading, navigate]);

   return (
      <div className="register h-full bg-[#f7f7ff]">
         <div className="wrapper flex justify-center flex-col items-center h-full">

            {/* logo */}
            <div className="flex items-center gap-1 text-2xl text-[#7269ef] mb-12">
               <i className="ri-chat-smile-2-fill"></i>
               <span className="text-slate-700 font-semibold">MoreChat</span>
            </div>

            {/* content */}
            <div className="flex flex-col items-center mb-6">
               <h4 className="text-lg font-semibold text-[#495057]">Sing up</h4>
               <p className="text-[#7a7f9a]">Get your MoreChat account now.</p>
            </div>

            {/* form card */}
            <div className="flex flex-col break-words bg-white rounded-lg p-9 mb-6 w-full max-w-[450px]">
               <form method="post" onSubmit={handleSubmit}>
                  <LogInput
                     label="email"
                     children="Email"
                     placeholder="Enter Email"
                     icon="ri-mail-line"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                  />
                  <LogInput
                     label="username"
                     children="Username"
                     placeholder="Enter Username"
                     icon="ri-user-2-line"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                  />
                  <LogInput
                     label="password"
                     children="Password"
                     placeholder="Enter Password"
                     icon="ri-lock-2-line"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                  />

                  {/* send */}
                  <div className="mb-4 mt-6">
                     <button
                        className="w-full flex justify-center items-center p-2 rounded-[4px] transition-all bg-[#7269ef] text-white hover:bg-[#6159cb]"
                        type="submit"
                     >
                        Sing up
                     </button>
                  </div>
               </form>
            </div>

            {/* text footer */}
            <div className="mt-12 text-center text-[15px] font-medium text-gray-700">
               <p className="mb-4">
                  Already have an account?{" "}
                  <Link className="text-[#7269ef]" to="/login">
                     Signin
                  </Link>
               </p>
               <p>?? 2022 MoreChat. Crafted with by habibmustafa</p>
            </div>
         </div>
      </div>
   );
};

export default Register;