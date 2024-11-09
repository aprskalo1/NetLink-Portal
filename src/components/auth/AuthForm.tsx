import React, {useState} from 'react';
import InputField from '../InputField.tsx';
import {toast} from "react-toastify";

interface AuthFormProps {
    onSubmit: (email: string, password: string) => Promise<void>;
    buttonText: string;
}

const AuthForm = ({onSubmit, buttonText}: AuthFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit(email, password);
        } catch {
            toast.error("Ooops! Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@example.com"
                required
            />
            <InputField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Must be at least 6 characters"
                required
            />
            <button type="submit" className="btn btn-primary w-full">
                {loading ? <span className="loading loading-spinner"></span> : buttonText}
            </button>
        </form>
    );
};

export default AuthForm;