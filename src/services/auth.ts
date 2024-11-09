import {signOut} from "firebase/auth";
import {auth} from "./firebase.ts";
import {toast} from "react-toastify";

export const handleSignOut = async (): Promise<void> => {
    try {
        await signOut(auth);
        localStorage.removeItem('accessToken');
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Error logging out.";
        toast.error(errorMessage);
    }
};