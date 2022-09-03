import React, { useEffect } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { SideBar } from "../components/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux/es/exports";
import { auth } from "../firebaseCongif/auth";
import { ref, onValue } from "firebase/database";
import { usersDB, userOnlineCheck } from "../firebaseCongif/usersDB";
import { setAllUsers, setUser } from "../store/userSlice";
import { setMessages } from "../store/messageSlice";

const Dashboard = () => {
   const [user, loading] = useAuthState(auth);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (loading) return;
      if (!user) {
         navigate("/login");
      } else {
         onValue(ref(usersDB, `users/`), (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
               dispatch(setUser(data[user.uid]));
               dispatch(
                  setAllUsers(
                     Object.values(data).filter(item => item.uid !== user.uid).sort((a, b) => a.createdAt - b.createdAt)
                  )
               );
               localStorage.setItem("user", JSON.stringify(data[user.uid]));
            }
         });
      }
   }, [user, loading, navigate, dispatch]);

   useEffect(() => {
      if (user) {
         userOnlineCheck(user.uid, true);
         window.addEventListener("unload", () => {
            userOnlineCheck(user.uid, false);
         });
      }

      return () => {
         dispatch(setMessages([]))
         if (user) {
            userOnlineCheck(user.uid, false);
            window.addEventListener("unload", () => {
               userOnlineCheck(user.uid, false);
            });
         }
      };
   }, [user]);

   return (
      <div className="chat flex h-full min-w-[280px] tablet:w-full ">
         <SideBar />
         <ChatContainer />
      </div>
   );
};

export default Dashboard;
