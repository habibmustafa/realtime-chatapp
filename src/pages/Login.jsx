import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogInput } from "../components/LogInput";
import { auth, login } from "../firebaseCongif/auth";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch } from "react-redux";
import { setChatUser, setChatUserId } from "../store/userSlice";

const Login = () => {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [user, loading] = useAuthState(auth);
   const navigate = useNavigate();
   const dispatch = useDispatch()

   const handleSubmit = async (e) => {
      e.preventDefault();
      await login(email, password);
   };

   useEffect(() => {
      if(loading) return
      if (user) {
         dispatch(setChatUserId(false))
         dispatch(setChatUser(false))
         navigate("/");
      }
   }, [user, loading, navigate]);

   return (
      <div className="login h-full bg-[#f7f7ff]">
         <div className="wrapper h-full">
            <div className="flex justify-center flex-col items-center h-full">
               {/* logo */}
               <div className="flex items-center gap-1 text-2xl text-[#7269ef] mb-12">
                  <i className="ri-chat-smile-2-fill"></i>
                  <span className="text-slate-700 font-semibold">ChatAPP</span>
               </div>

               {/* content */}
               <div className="flex flex-col items-center mb-6">
                  <h4 className="text-lg font-semibold text-[#495057]">
                     Sign in
                  </h4>
                  <p className="text-[#7a7f9a]">
                     Sing in to coutinue to ChatAPP
                  </p>
               </div>

               <div className="flex flex-col break-words bg-white rounded-lg p-9 mb-6 w-full max-w-[450px]">
                  {/* card */}
                  <form onSubmit={handleSubmit}>
                     <LogInput
                        label="email"
                        children="Email"
                        placeholder="Enter Email"
                        icon="ri-mail-line"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                     />
                     <LogInput
                        forgot="true"
                        label="password"
                        children="Password"
                        placeholder="Enter Password"
                        icon="ri-lock-2-line"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                     />

                     <div className="mb-4 mt-6">
                        <button
                           className="w-full flex justify-center items-center p-2 rounded-[4px] transition-all bg-[#7269ef] text-white hover:bg-[#6159cb]"
                           type="submit"
                        >
                           Sign in
                        </button>
                     </div>
                  </form>
               </div>

               {/* text footer */}
               <div className="mt-12 text-center text-[15px] font-medium text-gray-700">
                  <p className="mb-4">
                     Don't have an account?{" "}
                     <Link className="text-[#7269ef]" to="/register">
                        Signup now
                     </Link>
                  </p>
                  <p>© 2022 ChatAPP. Crafted with by habibmustafa</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
