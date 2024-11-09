import {useCallback, useEffect, useState} from "react";
import {fetchEndUserGroups} from "../services/api.ts";
import {ArrowLeftIcon, MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {Group} from "../types/types.ts";
import GroupDetailsModal from './GroupDetailsModal';

interface GroupsContainerProps {
    endUserId: string;
    onBack: () => void;
}

const GroupsContainer = ({endUserId, onBack}: GroupsContainerProps) => {
    const [groups, setGroups] = useState<Group[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState<Group | undefined>(undefined);

    const loadGroups = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await fetchEndUserGroups(endUserId);
            setGroups(data);
        } catch (error) {
            console.error("Error loading groups:", error);
        } finally {
            setIsLoading(false);
        }
    }, [endUserId]);

    useEffect(() => {
        loadGroups();
    }, [loadGroups]);

    const handleModalOpen = (group: Group) => {
        setSelectedGroup(group);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedGroup(undefined);
    };

    const handleUpdate = async () => {
        await loadGroups();
        handleModalClose();
    };

    return (
        <div className="w-full flex flex-col items-center">
            <div className="overflow-x-auto sm:w-8/12 w-full">
                <h2 className="text-2xl font-semibold text-center">Groups</h2>
                <div className="max-h-[500px] overflow-y-auto mt-4">
                    <table className="table table-zebra w-full">
                        <thead>
                        <tr>
                            <th></th>
                            <th>Group Name</th>
                            <th>Created At</th>
                            <th>Details</th>
                        </tr>
                        </thead>
                        <tbody>
                        {groups.map((group, index) => (
                            <tr key={group.id}>
                                <td>{index + 1}</td>
                                <td>{group.groupName}</td>
                                <td>{new Date(group.createdAt).toLocaleString()}</td>
                                <td>
                                    <MagnifyingGlassIcon
                                        tabIndex={0}
                                        role="button"
                                        onClick={() => handleModalOpen(group)}
                                        className="btn btn-sm btn-ghost p-0.5"
                                    />
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                {groups.length === 0 && !isLoading && <p className="mt-10 mb-5 text-center">No groups available.</p>}
                <button onClick={onBack} className="btn btn-ghost flex items-center gap-2 mt-2">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    End Users
                </button>
            </div>
            {isModalOpen && selectedGroup && (
                <GroupDetailsModal
                    isOpen={isModalOpen}
                    endUserId={endUserId}
                    group={selectedGroup}
                    onClose={handleModalClose}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
};

export default GroupsContainer;