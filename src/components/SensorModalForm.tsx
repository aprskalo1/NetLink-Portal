import {FormEvent, useEffect, useRef, useState} from "react";
import {Sensor} from "../types/types";
import {updateSensor, addSensor} from "../services/api";

interface SensorModalFormProps {
    sensor?: Sensor;
    endUserId: string;
    onClose: () => void;
    onUpdate: (updatedSensor: Sensor) => void;
    onAdd: (newSensorId: string) => void;
    isEditMode?: boolean;
}

const SensorModalForm = ({sensor, endUserId, onClose, onUpdate, onAdd, isEditMode = false}: SensorModalFormProps) => {
    const [deviceName, setDeviceName] = useState(sensor?.deviceName || "");
    const [deviceType, setDeviceType] = useState(sensor?.deviceType || "");
    const [measurementUnit, setMeasurementUnit] = useState(sensor?.measurementUnit || "");
    const [deviceLocation, setDeviceLocation] = useState(sensor?.deviceLocation || "");
    const [deviceDescription, setDeviceDescription] = useState(sensor?.deviceDescription || "");
    const [isProcessing, setIsProcessing] = useState(false);

    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
    }, []);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const sensorData = {
            deviceName,
            deviceType,
            measurementUnit,
            deviceLocation,
            deviceDescription,
        };

        try {
            if (isEditMode && sensor) {
                const updatedSensor = await updateSensor(sensor.id, endUserId, sensorData);
                onUpdate(updatedSensor);
            } else {
                const newSensorId = await addSensor(endUserId, sensorData);
                onAdd(newSensorId);
            }
            onClose();
        } catch (error) {
            console.error(`Failed to ${isEditMode ? "update" : "add"} sensor:`, error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <dialog id="sensor_modal" ref={dialogRef} className="modal">
            <div className="modal-box">
                <form onSubmit={handleSubmit}>
                    <button type="button" onClick={onClose}
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg mb-4">{isEditMode ? "Update Sensor" : "Add New Sensor"}</h3>

                    <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                        Device Name
                        <input
                            type="text"
                            className="grow p-2"
                            value={deviceName}
                            onChange={(e) => setDeviceName(e.target.value)}
                            required
                        />
                    </label>

                    <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                        Device Type
                        <input
                            type="text"
                            className="grow p-2"
                            value={deviceType}
                            onChange={(e) => setDeviceType(e.target.value)}
                            required
                        />
                    </label>

                    <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                        Measurement Unit
                        <input
                            type="text"
                            className="grow p-2"
                            value={measurementUnit}
                            onChange={(e) => setMeasurementUnit(e.target.value)}
                            required
                        />
                    </label>

                    <label className="input input-bordered input-sm flex items-center gap-2 mb-2">
                        Location
                        <input
                            type="text"
                            className="grow p-2"
                            value={deviceLocation}
                            onChange={(e) => setDeviceLocation(e.target.value)}
                        />
                    </label>

                    <label className="input input-bordered input-sm flex items-center gap-2">
                        Description
                        <input
                            type="text"
                            className="grow p-2"
                            value={deviceDescription}
                            onChange={(e) => setDeviceDescription(e.target.value)}
                        />
                    </label>

                    <div className="modal-action mt-3">
                        <button type="submit" className="btn btn-primary btn-outline w-full btn-sm"
                                disabled={isProcessing}>
                            {isProcessing ? (isEditMode ? "Updating..." : "Adding...") : (isEditMode ? "Update" : "Add")}
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default SensorModalForm;