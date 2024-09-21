import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../services/firebase.ts";
import {jwtDecode} from "jwt-decode";
import InputField from '../components/InputField';
import CopyToClipboard from "../components/CopyToClipboard.tsx";

interface DecodedToken {
    developerId: string;
    username: string;
    devToken: string;
    active: string;
    createdAt: string;
}

const ProfilePage = () => {
    const [profileData, setProfileData] = useState({
        username: '',
        apiKey: '',
        status: '',
        createdAt: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (!user) {
                navigate('/login');
            } else {
                const token = localStorage.getItem('accessToken');
                if (token) {
                    try {
                        const decodedToken: DecodedToken = jwtDecode(token);

                        setProfileData({
                            username: decodedToken.username,
                            apiKey: decodedToken.devToken,
                            status: decodedToken.active === "True" ? "Active" : "Inactive",
                            createdAt: new Date(decodedToken.createdAt).toLocaleDateString(),
                        });
                    } catch (error) {
                        console.error("Invalid token:", error);
                        navigate('/login');
                    }
                }
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    return (
        <>
            <p className="text-xl font-bold text-center mb-5 lg:text-4xl">
                Welcome, {profileData.username}
            </p>
            <div className="flex flex-col gap-3 lg:w-8/12">
                <div className="flex justify-around">
                    <InputField
                        label="Dev Token"
                        type="text"
                        value={profileData.apiKey}
                        placeholder="Your API Key"
                        readonly
                    />
                    <CopyToClipboard text={profileData.apiKey}/>
                </div>
                <InputField
                    label="Username"
                    type="text"
                    value={profileData.username}
                    placeholder="user@example.com"
                    readonly
                />
                <InputField
                    label="Status"
                    type="text"
                    value={profileData.status}
                    placeholder="Active / Inactive"
                    readonly
                />
                <InputField
                    label="Created At"
                    type="text"
                    value={profileData.createdAt}
                    placeholder="mm/dd/yyyy"
                    readonly
                />
            </div>
        </>
    );
};

export default ProfilePage;
