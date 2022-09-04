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
   const { chatUserId} = useSelector(state => state.user)
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
                        .filter((item) => item.uid !== user.uid)
                        .sort((a, b) => a.createdAt - b.createdAt)
                  )
               );
               // chatUserId && dispatch(setChatUser(data[chatUserId]))
               localStorage.setItem("user", JSON.stringify(data[user.uid]));
            }
         });
      }
   }, [user, loading, navigate, dispatch]);

   useEffect(() => {
      onValue(ref(usersDB, `users/${chatUserId}`), snap => {
         const data = snap.val();
         if(data !== null) {
            dispatch(setChatUser(data))
         }
      })
   }, [chatUserId])

   useEffect(() => {
      if (user) {
         // userOnlineCheck(user.uid, true);
         // window.addEventListener("unload", () => {
         //    userOnlineCheck(user.uid, false);
         // });
         onValue(ref(usersDB, '.info/connected'), (snap) => {
            if (snap.val() === true) {
               // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
               // const con = push(myConnectionsRef);
               userOnlineCheck(user.uid, true);
           
               // When I disconnect, remove this device
               onDisconnect(ref(usersDB, `users/${user.uid}/isActive`)).set(false);
           
               // Add this device to my connections list
               // this value could contain info about the device or a timestamp too
               // set(con, true);
           
               // When I disconnect, update the last time I was seen online
               // onDisconnect(lastOnlineRef).set(serverTimestamp());
             }
         })
      }
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
