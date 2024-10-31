import {useSelector} from "react-redux";
import InputField from '../components/InputField';
import CopyToClipboard from "../components/CopyToClipboard";
import {RootState} from "../store/store";

const ProfilePage = () => {
    const profileData = useSelector((state: RootState) => state.user);

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
                        value={profileData.devToken || ""}
                        placeholder="Your API Key"
                        readonly
                    />
                    <CopyToClipboard text={profileData.devToken || ""}/>
                </div>
                <InputField
                    label="Username"
                    type="text"
                    value={profileData.username || ""}
                    placeholder="user@example.com"
                    readonly
                />
                <InputField
                    label="Status"
                    type="text"
                    value={profileData.active ? "Active" : "Inactive"}
                    placeholder="Active / Inactive"
                    readonly
                />
                <InputField
                    label="Created At"
                    type="text"
                    value={profileData.createdAt ? new Date(profileData.createdAt).toLocaleDateString() : ""}
                    placeholder="mm/dd/yyyy"
                    readonly
                />
            </div>
        </>
    );
};

export default ProfilePage;