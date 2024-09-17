import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../services/firebase';
import {useNavigate} from 'react-router-dom';
import {Link} from "react-router-dom";
import React, {useState} from 'react';
import AuthWrapper from '../components/auth/AuthWrapper.tsx';
import AuthForm from '../components/auth/AuthForm.tsx';
import Alert from '../components/AlertComponent.tsx';
import GoogleLoginButton from "../components/auth/GoogleLoginButton.tsx";
import AppleLogInButton from "../components/auth/AppleLogInButton.tsx";

const LoginPage: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/docs/profile');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
                if (err.message.includes('auth/invalid-credential')) {
                    setError('Incorrect credentials. Please try again.');
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
                <AppleLogInButton/>
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