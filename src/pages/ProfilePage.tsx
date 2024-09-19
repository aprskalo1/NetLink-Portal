import InputField from '../components/InputField';
import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../services/firebase.ts";

const ProfilePage = () => {
    const [apiKey, setApiKey] = useState("");
    const [username, setUsername] = useState("");
    const [status, setStatus] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else {
                setUsername(user.email?.toString() || '');
                setApiKey('');
                setStatus('');
                setCreatedAt('');
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
            <p className="text-xl font-bold text-center mb-5 lg:text-4xl">
                Welcome, {username}
            </p>
            <div className="flex flex-col gap-3 lg:w-8/12">
                <InputField
                    label="Dev Token"
                    type="text"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Your API Key"
                    readonly
                />
                <InputField
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="user@example.com"
                    readonly
                />
                <InputField
                    label="Status"
                    type="text"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    placeholder="Active / Inactive"
                    readonly
                />
                <InputField
                    label="Created At"
                    type="text"
                    value={createdAt}
                    onChange={(e) => setCreatedAt(e.target.value)}
                    placeholder="mm/dd/yyyy"
                    readonly
                />
            </div>
        </>
    );
};

export default ProfilePage;
