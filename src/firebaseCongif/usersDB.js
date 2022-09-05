import { app } from "./";
import { getDatabase, ref, set } from "firebase/database";

export const usersDB = getDatabase(app);

export const addUser = (uid, email, username, createdAt, lastSignInTime) => {
   set(ref(usersDB, "users/" + uid), {
      uid,
      email,
      username,
      createdAt,
      isActive: {
         status: true,
         content: "Online"
      },
      bio: "",
      avatar:"",
      lastSignInTime
   });
};

export const lastSignIn = (uid, time) => {
   set(ref(usersDB, `users/${uid}/lastSignInTime`), time)
}

export const userOnlineCheck = (uid, status, content) => {
   set(ref(usersDB, `users/${uid}/isActive`), {
      status,
      content
   })
}

export const userSetAvatar = (uid, avatar) => {
   set(ref(usersDB, `users/${uid}/avatar`), avatar)
}