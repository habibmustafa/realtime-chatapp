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

// !<--------------------signIn-signUp------------------------>

// !register
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
      toast.error(err.code);
   }
};

// !login
export const login = async (email, password) => {
   try {
      const { data } = await signInWithEmailAndPassword(auth, email, password);
      return data;
   } catch (err) {
      toast.error(err.code);
   }
};

// !logOut
export const logOut = async () => {
   try {
      return await signOut(auth);
   } catch (err) {
      toast.error(err.code);
   }
};

// !<-----------------------update------------------------------->

// !update avatar
export const addAvatar = async (avatar) => {
   try {
      await updateProfile(auth.currentUser, {
         photoURL: avatar
      })
   } catch (err) {
      toast.error(err.code);
   }
}
// !update username
export const updateDisplayName = async (username) => {
   try {
      await updateProfile(auth.currentUser, {
         displayName: username
      })
   } catch (err) {
      toast.error(err.code);
   }
}


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
