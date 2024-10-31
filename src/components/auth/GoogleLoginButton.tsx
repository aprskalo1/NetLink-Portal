import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {authorizeFirebaseClient} from "../../services/api.ts";
import {useNavigate} from 'react-router-dom';
import {auth} from '../../services/firebase';
import GoogleIcon from '../../assets/google-icon.png';
import {useDispatch} from "react-redux";
import {jwtDecode} from "jwt-decode";
import {setUser} from "../../store/userSlice.ts";
import {CustomJwtPayload} from "../../types/types.ts";

const GoogleLoginButton = () => {
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider();
    const dispatch = useDispatch();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);

            const firebaseToken = await auth.currentUser!.getIdToken();
            const accessToken = await authorizeFirebaseClient(firebaseToken);
            localStorage.setItem('accessToken', accessToken);

            const {developerId, username, devToken, active, createdAt} = jwtDecode<CustomJwtPayload>(accessToken);
            dispatch(setUser({developerId, username, devToken, active: active === "True", createdAt}));

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