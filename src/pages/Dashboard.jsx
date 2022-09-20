import React, { useEffect } from "react";
import ChatContainer from "../components/ChatContainer";
import SideBar from "../components/SideBar";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { auth } from "../firebaseCongif/auth";
import { ref, onValue, onDisconnect } from "firebase/database";
import { usersDB, userOnlineCheck } from "../firebaseCongif/usersDB";
import { setAllUsers, setChatUser, setUser } from "../store/userSlice";
import { setMessages } from "../store/messageSlice";
import { setShow, setShowEmoji, setViewProfile } from "../store/animSlice";
import ViewProfile from "../components/ViewProfile";

const Dashboard = () => {
   const [user, loading] = useAuthState(auth);
   const { chatUserId, allUsers } = useSelector((state) => state.user);
   const { viewProfile, showEmoji } = useSelector((state) => state.anim);
   const dispatch = useDispatch();

   // !pushState transactions (back event)
   useEffect(() => {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
         window.history.go(1);
         if (window.innerWidth <= 991) {
            if (viewProfile) {
               dispatch(setViewProfile(false));
            } else if (showEmoji) {
               dispatch(setShowEmoji(false));
            } else {
               dispatch(setShow(false));
            }
         }
      };
   }, [viewProfile, showEmoji]);

   // !active user and other allUsers detected
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
                        .sort((a, b) => a.username?.localeCompare(b.username))
                  )
               );
               localStorage.setItem("user", JSON.stringify(data[user.uid]));
            }
         });
      }
   }, [user]);

   // !chatUser detected
   useEffect(() => {
      chatUserId &&
         dispatch(
            setChatUser(allUsers.filter((item) => item.uid === chatUserId)[0])
         );
   }, [chatUserId, allUsers]);

   // !Connect - Disconnect
   useEffect(() => {
      if (user && user.photoURL) {
         onValue(ref(usersDB, ".info/connected"), (snap) => {
            if (snap.val() === true) {
               // ?We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
               userOnlineCheck(user.uid, true, "Online");

               // ?When I disconnect, remove this device
               onDisconnect(ref(usersDB, `users/${user.uid}/isActive`)).set({
                  status: false,
                  content: `${new Date().toString().substring(4, 21)}`,
               });
            }
         });
      }
      return () => {
         dispatch(setMessages([]));
      };
   }, [user]);

   // !geolocation
   useEffect(() => {
      if (navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(successFunction, (err) => {
            console.log(err);
         });
      }
      //Get latitude and longitude;
      function successFunction(position) {
         let lat = position.coords.latitude;
         let long = position.coords.longitude;
         console.log(lat, long);
      }
   }, []);

   return (
      <div className="chat flex h-full min-w-[280px] relative tablet:w-full">
         <SideBar />
         <ChatContainer />
         {viewProfile && <ViewProfile />}
      </div>
   );
};

export default Dashboard;
