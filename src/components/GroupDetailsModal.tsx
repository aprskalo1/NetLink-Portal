import {Group, Sensor} from "../types/types.ts";
import {useRef, useEffect, useState} from "react";
import SearchBar from "./SearchBar.tsx";
import Pagination from "./Pagination.tsx";
import {
    fetchSensorsFromGroup,
    fetchPaginatedEndUserSensors,
    updateGroup,
    deleteGroup,
    addSensorsToGroup, removeSensorFromGroup
} from "../services/api.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

interface GroupDetailsModalProps {
    isOpen: boolean;
    group: Group;
    endUserId: string;
    onClose: () => void;
    onUpdate: () => void;
}

const GroupDetailsModal = ({isOpen, group, onClose, endUserId, onUpdate}: GroupDetailsModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const pageSize = 8;

    const [groupName, setGroupName] = useState(group.groupName);
    const [isModified, setIsModified] = useState(false);
    const [assignedSensors, setAssignedSensors] = useState<Sensor[]>([]);
    const [unassignedSensors, setUnassignedSensors] = useState<Sensor[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [assignedSelectedId, setAssignedSelectedId] = useState<string | null>(null);
    const [nonAssignedSelectedIds, setNonAssignedSelectedIds] = useState<string[]>([]);
    const [isAssignedSensorSelected, setIsAssignedSensorSelected] = useState(false);
    const [isUnassignedSensorSelected, setIsUnassignedSensorSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [assignedLoaded, setAssignedLoaded] = useState(false);

    useEffect(() => {
        const fetchAssignedSensors = async () => {
            try {
                const sensors = await fetchSensorsFromGroup(group.id, endUserId);
                setAssignedSensors(sensors);
            } catch (error) {
                const errorMessage = error instanceof AxiosError && error.response?.data?.message
                    ? error.response.data.message
                    : "Failed to load assigned sensors.";
                toast.error(errorMessage);
            } finally {
                setAssignedLoaded(true);
            }
        };

        if (isOpen) {
            dialogRef.current?.showModal();
            fetchAssignedSensors();
        } else {
            dialogRef.current?.close();
        }
    }, [isOpen, group.id, endUserId]);

    useEffect(() => {
        const loadUnassignedSensors = async () => {
            setIsLoading(true);
            try {
                const data = await fetchPaginatedEndUserSensors(endUserId, page, pageSize, searchTerm);
                const unassigned = data.sensors.filter(
                    (sensor: Sensor) => !assignedSensors.some((assigned) => assigned.id === sensor.id)
                );
                setUnassignedSensors(unassigned);
                setTotalCount(data.totalCount - assignedSensors.length);
            } catch (error) {
                const errorMessage = error instanceof AxiosError && error.response?.data?.message
                    ? error.response.data.message
                    : "Failed to load sensors.";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };

        if (assignedLoaded) {
            loadUnassignedSensors();
        }
    }, [assignedLoaded, assignedSensors, endUserId, page, pageSize, searchTerm, isOpen]);

    const handleGroupNameChange = (newGroupName: string) => {
        setGroupName(newGroupName);
        setIsModified(newGroupName !== group.groupName);
    };

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleAssignedCheckboxChange = (sensorId: string) => {
        const isSelected = sensorId === assignedSelectedId ? null : sensorId;
        setAssignedSelectedId(isSelected);
        setIsAssignedSensorSelected(!!isSelected);
    };

    const handleNonAssignedCheckboxChange = (sensorId: string) => {
        setNonAssignedSelectedIds((prevSelected) => {
            const updatedSelection = prevSelected.includes(sensorId)
                ? prevSelected.filter((id) => id !== sensorId)
                : [...prevSelected, sensorId];

            setIsUnassignedSensorSelected(updatedSelection.length > 0);
            return updatedSelection;
        });
    };

    const handleSaveChanges = async () => {
        try {
            await updateGroup(group.id, endUserId, groupName);
            toast.success("Group updated successfully.");
            onUpdate();
            onClose();
        } catch {
            toast.error("Failed to update group.");
        }
    };

    const handleDeleteGroup = async () => {
        try {
            await deleteGroup(group.id, endUserId);
            toast.success("Group deleted successfully.");
            onUpdate();
            onClose();
        } catch {
            toast.error("Failed to delete group.");
        }
    };

    const totalPages = Math.ceil(totalCount / pageSize);

    const refreshSensors = async () => {
        const updatedAssignedSensors = await fetchSensorsFromGroup(group.id, endUserId);
        setAssignedSensors(updatedAssignedSensors);

        const data = await fetchPaginatedEndUserSensors(endUserId, page, pageSize, searchTerm);
        const unassigned = data.sensors.filter(
            (sensor: Sensor) => !updatedAssignedSensors.some((assigned) => assigned.id === sensor.id)
        );
        setUnassignedSensors(unassigned);
        setTotalCount(data.totalCount - updatedAssignedSensors.length);
    }

    const handleAssignSensors = async () => {
        if (nonAssignedSelectedIds.length === 0) return;

        try {
            await addSensorsToGroup(group.id, nonAssignedSelectedIds, endUserId);
            toast.success("Sensors assigned successfully.");

            setNonAssignedSelectedIds([]);
            setIsUnassignedSensorSelected(false);

            refreshSensors();
        } catch {
            toast.error("Failed to assign sensors.");
        }
    };

    const handleUnassignSensor = async () => {
        if (!assignedSelectedId) return;

        try {
            await removeSensorFromGroup(group.id, assignedSelectedId, endUserId);
            toast.success("Sensor unassigned successfully.");

            setAssignedSelectedId(null);
            setIsAssignedSensorSelected(false);

            refreshSensors();
        } catch {
            toast.error("Failed to unassign sensor.");
        }
    };

    return (
        <dialog ref={dialogRef} className="modal" onClose={onClose}>
            <div className="modal-box max-w-3xl">
                <button
                    className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                    onClick={onClose}
                >
                    ✕
                </button>
                <h3 className="font-bold text-lg text-center mb-4">Group Info</h3>
                <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                    Group Name
                    <input
                        type="text"
                        className="grow p-2"
                        value={groupName}
                        onChange={(e) => handleGroupNameChange(e.target.value)}
                        required
                    />
                </label>
                <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                    Created At
                    <input
                        type="text"
                        className="grow p-2"
                        value={new Date(group.createdAt).toLocaleString()}
                        readOnly
                    />
                </label>
                <div className="collapse collapse-arrow bg-base-200 mb-2">
                    <input type="radio" name="my-accordion-2" defaultChecked/>
                    <div className="collapse-title text-lg font-medium">Sensors in this group</div>
                    <div className="collapse-content">
                        <div className="overflow-x-auto max-h-56">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Unit</th>
                                    <th>Location</th>
                                </tr>
                                </thead>
                                <tbody>
                                {assignedSensors.length > 0 ? (
                                    assignedSensors.map((sensor) => (
                                        <tr key={sensor.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-xs"
                                                    checked={assignedSelectedId === sensor.id}
                                                    onChange={() => handleAssignedCheckboxChange(sensor.id)}
                                                />
                                            </td>
                                            <td className="overflow-auto max-w-10">{sensor.deviceName}</td>
                                            <td className="overflow-auto max-w-10">{sensor.deviceType}</td>
                                            <td className="overflow-auto max-w-10">{sensor.measurementUnit}</td>
                                            <td className="overflow-auto max-w-10">{sensor.deviceLocation}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            No sensors are currently assigned to this group.
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="relative flex items-center justify-end">
                            {isAssignedSensorSelected && (
                                <button className="btn btn-error btn-outline btn-sm mt-1 right-0"
                                        onClick={handleUnassignSensor}>Unassign</button>
                            )}
                        </div>
                    </div>
                </div>
                <div className="collapse collapse-arrow bg-base-200 mb-2">
                    <input type="radio" name="my-accordion-2"/>
                    <div className="collapse-title text-lg font-medium">Assign sensors to the group</div>
                    <div className="collapse-content">
                        <SearchBar onSearch={handleSearch} isLoading={isLoading} size="small"
                                   placeholder="Search sensors by anything..."/>
                        <div className="overflow-x-auto max-h-56">
                            <table className="table">
                                <thead>
                                <tr>
                                    <th></th>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Unit</th>
                                    <th>Location</th>
                                </tr>
                                </thead>
                                <tbody>
                                {unassignedSensors.length > 0 ? (
                                    unassignedSensors.map((sensor) => (
                                        <tr key={sensor.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    className="checkbox checkbox-xs"
                                                    checked={nonAssignedSelectedIds.includes(sensor.id)}
                                                    onChange={() => handleNonAssignedCheckboxChange(sensor.id)}
                                                />
                                            </td>
                                            <td className="overflow-auto max-w-10">{sensor.deviceName}</td>
                                            <td className="overflow-auto max-w-10">{sensor.deviceType}</td>
                                            <td className="overflow-auto max-w-10">{sensor.measurementUnit}</td>
                                            <td className="overflow-auto max-w-10">{sensor.deviceLocation}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center">
                                            {isLoading ? "Loading..." : "No sensors available to assign."}
                                        </td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                        <div className="relative flex flex-row items-center">
                            {unassignedSensors.length > 0 && (
                                <div className="mx-auto">
                                    <Pagination
                                        currentPage={page}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                        size="small"
                                    />
                                </div>
                            )}

                            {isUnassignedSensorSelected && (
                                <button className="btn btn-accent btn-outline btn-sm absolute right-0"
                                        onClick={handleAssignSensors}>Assign</button>
                            )}
                        </div>
                    </div>
                </div>
                {isModified ? (
                    <button className="btn btn-primary btn-outline btn-sm w-full" onClick={handleSaveChanges}>
                        Save Changes
                    </button>
                ) : (
                    <button className="btn btn-error btn-outline btn-sm w-full" onClick={handleDeleteGroup}>
                        Delete Group
                    </button>
                )}
            </div>
        </dialog>
    );
};

export default GroupDetailsModal;