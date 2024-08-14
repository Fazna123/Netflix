import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYJnKqmx1o9pwdCus0shBm-dNeRyXPIZY",
  authDomain: "netflixclone-983e5.firebaseapp.com",
  projectId: "netflixclone-983e5",
  storageBucket: "netflixclone-983e5.appspot.com",
  messagingSenderId: "233295400062",
  appId: "1:233295400062:web:ffa1698b5bf085a1089c2f",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleAuth = new GoogleAuthProvider();
export const database = getFirestore(app);
