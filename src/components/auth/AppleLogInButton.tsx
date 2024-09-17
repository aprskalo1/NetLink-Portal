import {OAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "../../services/firebase";
import AppleIcon from "../../assets/apple-icon.png";

const AppleLogInButton = () => {
    const oAuthProvider = new OAuthProvider('apple.com');
    oAuthProvider.addScope('email');
    oAuthProvider.addScope('name');

    function handleAppleLogin() {
        try {
            signInWithPopup(auth, oAuthProvider).then(() => {
                navigate('/docs/profile');
            });
        } catch (error) {
            console.error('Apple login failed:', error);
        }
    }

    return (
        <button onClick={handleAppleLogin} className="btn btn-circle ms-1 me-1">
            <img src={AppleIcon} alt="Apple Icon" className="inline-block h-6 w-6"/>
        </button>
    );
};

export default AppleLogInButton;