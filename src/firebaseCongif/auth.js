import { app } from "./";
import {
   getAuth,
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   updateProfile,
} from "firebase/auth";
import toast from "react-hot-toast";

export const auth = getAuth(app);

// register
export const register = async (email, password, username) => {
   try {
      const { data } = await createUserWithEmailAndPassword(
         auth,
         email,
         password
      );
      await updateProfile(auth.currentUser, {
         displayName: username
      })
      return data;
   } catch (err) {
      toast.error(err.message);
   }
};

// login
export const login = async (email, password) => {
   try {
      const { data } = await signInWithEmailAndPassword(auth, email, password);
      return data;
   } catch (err) {
      toast.error(err.message);
   }
};

// logOut
export const logOut = async () => {
   try {
      return await signOut(auth);
   } catch (err) {
      toast.error(err.message);
   }
};

// active user
// export const activeUser = () => {
//    onAuthStateChanged(auth, (user) => {
//       if (user) {
//          console.log(user);
//          return user;
//       } else {
//          console.log("Not User");
//          return user;
//       }
//    });
// };