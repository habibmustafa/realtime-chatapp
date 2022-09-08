import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from 'react-router-dom';
import { auth } from "../firebaseCongif/auth";

const PrivateRoute = ({children}) => {
   const [user, loading] = useAuthState(auth);

   if(loading) return
   if(!user) {
      return <Navigate to="/login" />
   }

   if(!user.photoURL) {
      return <Navigate to="/setAvatar" />
   }

  return children
}

export default PrivateRoute