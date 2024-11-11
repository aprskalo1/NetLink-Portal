import {FormEvent, useEffect, useRef, useState} from "react";
import {createGroup} from "../services/api.ts";
import {toast} from "react-toastify";
import {handleAxiosError} from "../utils/errorUtils.ts";

interface GroupCreateModalProps {
    onClose: () => void;
    endUserId: string;
    onCreateSuccess: () => void;
}

const GroupCreateModal = ({onClose, endUserId, onCreateSuccess}: GroupCreateModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [groupName, setGroupName] = useState("");

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleClose = () => {
        dialogRef.current?.close();
        onClose();
    };

    const handleCreateGroup = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await createGroup(endUserId, groupName);
            toast.success("Group created successfully.");
            onCreateSuccess();
            handleClose();
        } catch (error) {
            handleAxiosError(error, "Failed to create group.");  // Reusable error handler
        }
    };

    return (
        <dialog id="group-create-modal" ref={dialogRef} className="modal">
            <div className="modal-box">
                <form onSubmit={handleCreateGroup}>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg mb-4 text-center">New Group</h3>
                    <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                        Group Name
                        <input
                            type="text"
                            className="grow p-2"
                            required
                            value={groupName}
                            onChange={(e) => setGroupName(e.target.value)}
                        />
                    </label>
                    <button type="submit" className="btn btn-primary btn-outline btn-sm w-full mt-3">Create</button>
                </form>
            </div>
        </dialog>
    );
};

export default GroupCreateModal;