import {FormEvent, useEffect, useRef, useState} from "react";
import {fetchRecordedValues} from "../services/api.ts";
import {RecordedValue, Sensor} from "../types/types.ts";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

interface RecordingsModalProps {
    sensor: Sensor;
    sensorId: string;
    endUserId: string;
    onClose: () => void;
}

const RecordingsModal = ({sensor, sensorId, endUserId, onClose}: RecordingsModalProps) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [quantity, setQuantity] = useState<number>();
    const [isLoading, setIsLoading] = useState(false);
    const [startDate, setStartDate] = useState<string | undefined>(undefined);
    const [endDate, setEndDate] = useState<string | undefined>(undefined);
    const [isAscending, setIsAscending] = useState(true);
    const [isFiltered, setIsFiltered] = useState(false);
    const [recordedValues, setRecordedValues] = useState<RecordedValue[]>([]);

    useEffect(() => {
        const dialog = dialogRef.current;
        dialog?.showModal();

        return () => {
            dialog?.close();
        };
    }, []);

    const handleApplyFilters = async (event: FormEvent) => {
        event.preventDefault();
        const loadingTimeout = setTimeout(() => setIsLoading(true), 100);

        try {
            const data = await fetchRecordedValues(sensorId, endUserId, quantity, isAscending, startDate, endDate);
            setIsFiltered(true);
            setRecordedValues(data);
        } catch (error) {
            console.error("Error fetching filtered recorded values:", error);
        } finally {
            clearTimeout(loadingTimeout);
            setIsLoading(false);
        }
    };

    return (
        <>
            <dialog id="my_modal_3" ref={dialogRef} className="modal" onClose={onClose}>
                <div className="modal-box w-11/12 max-w-3xl">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={onClose}
                    >
                        ✕
                    </button>
                    <h3 className="font-bold text-lg text-center">{sensor.deviceName}</h3>
                    <div className="sticky top-0 bg-base-100 z-10 p-2 rounded bg-opacity-90">
                        <form className="mb-3 mt-3 flex justify-center flex-wrap" onSubmit={handleApplyFilters}>
                            <input
                                type="number"
                                placeholder="Quantity"
                                className="input input-bordered input-sm me-1 mb-1 w-2/12"
                                value={quantity || ""}
                                onChange={(e) => {
                                    const input = e.target.value ? Number(e.target.value) : undefined;
                                    const value = input !== undefined ? Math.max(0, Math.min(input, 100)) : undefined;
                                    setQuantity(value);
                                }}
                                max={100}
                            />
                            <input
                                type="date"
                                className="input input-bordered input-sm me-1 mb-1"
                                value={startDate || ""}
                                onChange={(e) => setStartDate(e.target.value)}
                                max={endDate || ""}
                            />
                            <input
                                type="date"
                                className="input input-bordered input-sm me-1 mb-1"
                                value={endDate || ""}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={startDate || ""}
                            />
                            <select
                                className="select select-bordered select-sm"
                                value={isAscending ? "ascending" : "descending"}
                                onChange={(e) => setIsAscending(e.target.value === "ascending")}
                            >
                                <option value="ascending">Ascending</option>
                                <option value="descending">Descending</option>
                            </select>
                            <button onClick={handleApplyFilters}
                                    className="btn btn-outline btn-primary btn-sm ms-1 min-w-10">
                                {isLoading ? (
                                    <span className="loading loading-spinner loading-sm"></span>
                                ) : (
                                    <MagnifyingGlassIcon className="w-5 h-5"/>
                                )}
                            </button>
                        </form>
                    </div>
                    <div className="overflow-x-auto">
                        {isFiltered ? (
                            recordedValues.length === 0 ? (
                                <p className="text-center mt-4 mb-4">No recorded data.</p>
                            ) : (
                                <table className="table table-xs table-pin-rows table-pin-cols">
                                    <thead>
                                    <tr>
                                        <td></td>
                                        <td>Recorded At</td>
                                        <td>Value</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {recordedValues.map((record, index) => (
                                        <tr key={index}>
                                            <th>{index + 1}</th>
                                            <td>{new Date(record.recordedAt).toLocaleString()}</td>
                                            <td>{record.value}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )
                        ) : (
                            <p className="text-center mt-4 mb-4">Search to see recorded data.</p>
                        )}
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default RecordingsModal;