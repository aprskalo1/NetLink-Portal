import {signInWithEmailAndPassword} from 'firebase/auth';
import {authorizeFirebaseClient} from "../services/api.ts";
import {useNavigate} from 'react-router-dom';
import {auth} from '../services/firebase';
import {Link} from "react-router-dom";
import {useState} from 'react';
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthForm from '../components/auth/AuthForm';
import Alert from '../components/Alert';
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";
import {setUser} from "../store/userSlice.ts";
import {CustomJwtPayload} from "../types/types.ts";

const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);

            const firebaseToken = await auth.currentUser!.getIdToken();
            const accessToken = await authorizeFirebaseClient(firebaseToken);
            localStorage.setItem('accessToken', accessToken);

            const {developerId, username, devToken, active, createdAt} = jwtDecode<CustomJwtPayload>(accessToken);
            dispatch(setUser({developerId, username, devToken, active: active === "True", createdAt}));

            navigate('/docs/profile');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
                if (err.message.includes('auth/wrong-password')) {
                    setError('Incorrect credentials. Please try again.');
                }
                if (err.message.includes('auth/user-not-found')) {
                    setError('User not found. Please register an account.');
                } else {
                    setError('An unexpected error occurred. Please try again later.');
                }
            }
        }
    };

    return (
        <AuthWrapper title="Login">
            {error && <Alert message={error} type="error"/>}
            <AuthForm onSubmit={handleLogin} buttonText="Login"/>
            <div className="flex justify-center">
                <GoogleLoginButton/>
            </div>
            <p className="mt-2 text-center">
                Don't have an account? <Link to={"/register"} className="text-primary">Register here</Link>
            </p>
            <p className="mt-2 text-center">
                <Link to={"/docs"} className="text-primary">Back to docs</Link>
            </p>
        </AuthWrapper>
    );
};

export default LoginPage;