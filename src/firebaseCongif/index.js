import { initializeApp } from "firebase/app";

const firebaseConfig = {
   apiKey: "AIzaSyAl6C7R_wLi3g4vsbxkcS7WCwLRmbgNPm0",
   authDomain: "test-5dbb3.firebaseapp.com",
   databaseURL:
      "https://test-5dbb3-default-rtdb.asia-southeast1.firebasedatabase.app/",
   projectId: "test-5dbb3",
   storageBucket: "test-5dbb3.appspot.com",
   messagingSenderId: "406867733268",
   appId: "1:406867733268:web:2a8829aa48d23894c23001",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
