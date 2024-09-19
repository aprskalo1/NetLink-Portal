import React, {useState} from 'react';
import InputField from '../InputField.tsx';

interface AuthFormProps {
    onSubmit: (email: string, password: string) => void;
    buttonText: string;
}

const AuthForm = ({onSubmit, buttonText}: AuthFormProps) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(email, password);
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
            <button type="submit" className="btn btn-primary w-full">{buttonText}</button>
        </form>
    );
};

export default AuthForm;