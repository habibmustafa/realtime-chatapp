import { app } from "./";
import { getDatabase, ref, set } from "firebase/database";

export const usersDB = getDatabase(app);

export const addUser = (uid, email, username, createdAt) => {
   set(ref(usersDB, "users/" + uid), {
      uid,
      email,
      username,
      createdAt,
      isActive: true,
      bio: "",
   });
};

export const userOnlineCheck = (uid, check) => {
   set(ref(usersDB, `users/${uid}/isActive`), check)
}