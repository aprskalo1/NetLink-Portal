import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {auth} from '../services/firebase';
import {Link} from "react-router-dom";
import AuthWrapper from '../components/auth/AuthWrapper';
import AuthForm from '../components/auth/AuthForm';
import Alert from '../components/Alert';
import GoogleLoginButton from "../components/auth/GoogleLoginButton";
import AppleLogInButton from "../components/auth/AppleLogInButton";

const RegisterPage = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (email: string, password: string) => {
        setError(null);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate("/login");
        } catch (err: unknown) {
            if (err instanceof Error) {
                if (err.message.includes('auth/email-already-in-use')) {
                    setError('This email is already in use. Login instead.');
                } else if (err.message.includes('auth/weak-password')) {
                    setError('Password must be at least 6 characters long.');
                } else if (err.message.includes('auth/invalid-email')) {
                    setError('The email you entered is not valid.');
                } else {
                    setError('An unexpected error occurred. Please try again later.');
                }
            }
        }
    };

    return (
        <AuthWrapper title="Register">
            {error && <Alert message={error} type="error"/>}
            <AuthForm onSubmit={handleRegister} buttonText="Register"/>
            <div className="flex justify-center">
                <GoogleLoginButton/>
                <AppleLogInButton/>
            </div>
            <p className="mt-2 text-center">
                Already have an account? <Link to={"/login"} className="text-primary">Login here</Link>
            </p>
            <p className="mt-2 text-center">
                <Link to={"/docs"} className="text-primary">Back to docs</Link>
            </p>
        </AuthWrapper>
    );
};

export default RegisterPage;
