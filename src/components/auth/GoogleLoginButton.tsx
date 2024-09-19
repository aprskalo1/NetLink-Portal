import {useNavigate} from 'react-router-dom';
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {auth} from '../../services/firebase';
import GoogleIcon from '../../assets/google-icon.png';

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/docs/profile');
        } catch (error) {
            console.error('Google login failed:', error);
        }
    };

    return (
        <button onClick={handleGoogleLogin} className="btn btn-circle ms-1 me-1">
            <img src={GoogleIcon} alt="Google Icon" className="inline-block h-6 w-6"/>
        </button>
    );
};

export default GoogleLoginButton;