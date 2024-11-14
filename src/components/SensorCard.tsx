import {useState} from "react";
import {ArrowRightIcon} from "@heroicons/react/24/solid";
import {PencilSquareIcon} from "@heroicons/react/24/outline";
import {Sensor} from "../types/types";
import {deleteSensor} from "../services/api";
import RecordingsModal from "./RecordingsModal.tsx";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

interface SensorCardProps {
    sensor: Sensor;
    endUserId: string;
    onDelete: (sensorId: string) => void;
    onUpdateSensor: (updatedSensor: Sensor) => void;
    openEditSensorModal: () => void;
}

const SensorCard = ({sensor, onDelete, endUserId, openEditSensorModal}: SensorCardProps) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        if (isDeleting) return;

        setIsDeleting(true);
        try {
            await deleteSensor(sensor.id, endUserId);
            toast.success("Sensor deleted successfully.");
            onDelete(sensor.id);
        } catch (error) {
            const errorMessage = error instanceof AxiosError && error.response?.data?.message
                ? error.response.data.message
                : "Failed to delete sensor.";
            toast.error(errorMessage);
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <div className="card-body">
                <h2 className="card-title flex justify-center overflow-x-auto">{sensor.deviceName || "Unnamed"}</h2>
                <hr/>

                <div className="flex justify-between items-center">
                    <label className="input input-bordered input-sm flex items-center gap-2">
                        Id
                        <input type="text" className="grow" value={sensor.id ? sensor.id.toString() : "N/A"} readOnly/>
                    </label>
                    <div className="badge badge-info max-w-24 overflow-hidden">
                        {sensor.deviceType || "n/a"}
                    </div>
                </div>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Type
                    <input type="text" className="grow" value={sensor.deviceType || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Unit
                    <input type="text" className="grow" value={sensor.measurementUnit || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Location
                    <input type="text" className="grow" value={sensor.deviceLocation || "n/a"} readOnly/>
                </label>

                <label className="input input-bordered input-sm flex items-center gap-2">
                    Description
                    <input type="text" className="grow" value={sensor.deviceDescription || "n/a"} readOnly/>
                </label>

                <div className="flex justify-between items-center">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="btn btn-outline btn-wide btn-primary btn-sm flex items-center gap-2 rounded-xl"
                    >
                        Recordings
                        <ArrowRightIcon className="w-5 h-5"/>
                    </button>
                    <div className="dropdown dropdown-left dropdown-end flex justify-end">
                        <PencilSquareIcon tabIndex={0} role="button" className="btn btn-sm btn-ghost p-0.5"/>
                        <ul tabIndex={0}
                            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                            <li>
                                <button className="btn btn-outline btn-info btn-sm" onClick={openEditSensorModal}>
                                    Edit
                                </button>
                            </li>
                            <li>
                                <button onClick={handleDelete} className="btn btn-outline btn-error btn-sm m-1"
                                        disabled={isDeleting}>
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            {isModalOpen && (
                <RecordingsModal
                    sensor={sensor}
                    sensorId={sensor.id}
                    endUserId={endUserId}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default SensorCard;
