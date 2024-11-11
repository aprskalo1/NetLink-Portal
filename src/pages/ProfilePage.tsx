import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import InputField from "../components/InputField";
import CopyToClipboard from "../components/CopyToClipboard";
import {RootState} from "../store/store";
import {deleteDeveloper} from "../services/api";
import {toast} from "react-toastify";
import {handleSignOut} from "../services/auth.ts";
import {clearUser} from "../store/userSlice.ts";

const ProfilePage = () => {
    const profileData = useSelector((state: RootState) => state.user);
    const [confirmationText, setConfirmationText] = useState("");
    const dispatch = useDispatch();

    const handleDelete = async () => {
        if (confirmationText.toLowerCase() === "delete") {
            try {
                await deleteDeveloper(profileData.developerId);
                await handleSignOut();
                dispatch(clearUser());
            } catch {
                toast.error("Oops! Something went wrong.");
            }
        } else {
            alert("Please type 'DELETE' to confirm.");
        }
    };

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

                <button className="btn btn-outline btn-error"
                        onClick={() => (document.getElementById('delete-modal') as HTMLDialogElement).showModal()}>
                    Delete Account
                </button>

                <dialog id="delete-modal" className="modal">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2 text-center">Confirm Deletion</h3>
                        <p>By deleting your account, all data will be lost and this action is irreversible.</p>
                        <input
                            type="text"
                            value={confirmationText}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            placeholder="Type 'DELETE' to confirm"
                            className="input input-bordered w-full mt-4"
                        />
                        <button
                            className="btn btn-error btn-outline btns w-full mt-4"
                            onClick={handleDelete}
                        >
                            Confirm Delete
                        </button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>Close</button>
                    </form>
                </dialog>
            </div>
        </>
    );
};

export default ProfilePage;