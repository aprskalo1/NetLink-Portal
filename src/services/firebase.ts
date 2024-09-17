import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCdlPtlA6ixY9yYpiXceMK01CSwp-Ue-q4",
    authDomain: "netlink-81ca5.firebaseapp.com",
    projectId: "netlink-81ca5",
    storageBucket: "netlink-81ca5.appspot.com",
    messagingSenderId: "835008980512",
    appId: "1:835008980512:web:1263c3b3b5a9df216d7e45",
    measurementId: "G-X9PZY3Z6RM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
