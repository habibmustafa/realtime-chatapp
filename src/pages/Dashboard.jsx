import React, { useEffect } from "react";
import { ChatContainer } from "../components/ChatContainer";
import { SideBar } from "../components/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { auth } from "../firebaseCongif/auth";
import { ref, onValue, onDisconnect } from "firebase/database";
import { usersDB, userOnlineCheck } from "../firebaseCongif/usersDB";
import { setAllUsers, setChatUser, setUser } from "../store/userSlice";
import { setMessages } from "../store/messageSlice";

const Dashboard = () => {
   const [user, loading] = useAuthState(auth);
   const { chatUserId, allUsers } = useSelector((state) => state.user);
   const dispatch = useDispatch();

   useEffect(() => {
      if (loading) return;
      else if (user) {
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
   }, [user]);

   useEffect(() => {
      chatUserId &&
         dispatch(
            setChatUser(allUsers.filter((item) => item.uid === chatUserId)[0])
         );
   }, [chatUserId, allUsers]);

   useEffect(() => {
         onValue(ref(usersDB, ".info/connected"), (snap) => {
            if (snap.val() === true && user && user.photoURL) {
               // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
               userOnlineCheck(user.uid, true, "Online");
   
               // When I disconnect, remove this device
               onDisconnect(ref(usersDB, `users/${user.uid}/isActive`)).set({
                  status: false,
                  content: `${new Date().toString().substring(4, 21)}`,
               });
            }
         });
      return () => {
         dispatch(setMessages([]));
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
