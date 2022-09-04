import React, { useEffect } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { SideBar } from "../components/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { auth } from "../firebaseCongif/auth";
import { ref, onValue, onDisconnect } from "firebase/database";
import { usersDB, userOnlineCheck } from "../firebaseCongif/usersDB";
import { setAllUsers, setChatUser, setUser } from "../store/userSlice";
import { setMessages } from "../store/messageSlice";

const Dashboard = () => {
   const [user, loading] = useAuthState(auth);
   const { chatUserId, chatUser } = useSelector((state) => state.user);
   const { connectionId } = useSelector((state) => state.message);
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
                     Object.values(data)
                        ?.filter((item) => item.uid !== user.uid)
                        .sort((a, b) => a.createdAt - b.createdAt)
                  )
               );
               localStorage.setItem("user", JSON.stringify(data[user.uid]));
            }
         });
      }
   }, [user, loading, navigate, dispatch]);

   useEffect(() => {
      onValue(ref(usersDB, `users/${chatUserId}`), (snap) => {
         const data = snap.val();
         if (data !== null) {
            dispatch(setChatUser(data));
         }
      console.log(1);

      });
   }, [chatUserId]);

   useEffect(() => {
      if (user) {
         onValue(ref(usersDB, ".info/connected"), (snap) => {
            if (snap.val() !== null) {
               // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
               userOnlineCheck(user.uid, true, "Online");

               // When I disconnect, remove this device
               onDisconnect(ref(usersDB, `users/${user.uid}/isActive`)).set({
                  status: false,
                  content: `Last seen: ${new Date()
                     .toString()
                     .substring(4, 21)}`,
               });
            }
         });
      }
      return () => {
         dispatch(setMessages([]));
      };
   }, [user]);

   console.log(chatUser);
   console.log(chatUserId);

   return (
      <div className="chat flex h-full min-w-[280px] tablet:w-full ">
         <SideBar />
         <ChatContainer />
      </div>
   );
};

export default Dashboard;
