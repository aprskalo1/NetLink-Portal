import {useEffect, useState} from "react";
import {fetchEndUserGroups} from "../services/api.ts";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {Group} from "../types/types.ts";

interface GroupsContainerProps {
    endUserId: string;
    onBack: () => void;
}

const GroupsContainer = ({endUserId, onBack}: GroupsContainerProps) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadGroups = async () => {
            setIsLoading(true);
            try {
                const data = await fetchEndUserGroups(endUserId);
                setGroups(data);
            } catch (error) {
                console.error("Error loading groups:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadGroups();
    }, [endUserId]);

    return (
        <div className="w-full flex flex-col items-center">
            <div className="overflow-x-auto w-8/12">
                <button onClick={onBack} className="btn btn-ghost flex items-center gap-2">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span className="hidden md:flex">End Users</span>
                </button>
                <table className="table table-zebra">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Group Name</th>
                        <th>Created At</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {groups.map((group, index) => (
                        <tr key={group.id}>
                            <td>{index + 1}</td>
                            <td>{group.groupName}</td>
                            <td>{new Date(group.createdAt).toLocaleString()}</td>
                            <td>
                                <PencilSquareIcon tabIndex={0} role="button" className="btn btn-sm btn-ghost p-0.5"/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            {groups.length === 0 && !isLoading && <p className="mt-10 text-center">No groups available.</p>}
        </div>
    );
};

export default GroupsContainer;