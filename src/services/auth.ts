import {signOut} from "firebase/auth";
import {auth} from "./firebase.ts";

export const handleSignOut = async (): Promise<void> => {
    try {
        await signOut(auth);
        localStorage.removeItem('accessToken');
    } catch (error) {
        console.error("Error logging out:", error);
    }
};
