import {useEffect, useState} from "react";
import SensorCard from "../components/SensorCard.tsx";
import SearchBar from "../components/SearchBar.tsx";
import Pagination from "../components/Pagination.tsx";
import {fetchPaginatedEndUserSensors, fetchSensorDetails} from "../services/api.ts";
import {ArrowLeftIcon, PlusIcon} from "@heroicons/react/24/outline";
import SensorModalForm from "../components/SensorModalForm";
import {Sensor} from "../types/types.ts";
import {toast} from "react-toastify";
import {AxiosError} from "axios";

interface SensorContainerProps {
    endUserId: string;
    onBack: () => void;
}

const SensorContainer = ({endUserId, onBack}: SensorContainerProps) => {
    const [sensors, setSensors] = useState<Sensor[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const pageSize = 8;
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentSensor, setCurrentSensor] = useState<Sensor | undefined>(undefined);

    useEffect(() => {
        const loadSensors = async () => {
            setIsLoading(true);

            try {
                const data = await fetchPaginatedEndUserSensors(endUserId, page, pageSize, searchTerm);
                setSensors(data.sensors);
                setTotalCount(data.totalCount);
            } catch (error) {
                const errorMessage = error instanceof AxiosError && error.response?.data?.message
                    ? error.response.data.message
                    : "Failed to load sensors.";
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        };
        loadSensors();
    }, [endUserId, page, pageSize, searchTerm]);

    const totalPages = Math.ceil(totalCount / pageSize);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setPage(1);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const handleDeleteSensor = (sensorId: string) => {
        setSensors(sensors.filter(sensor => sensor.id !== sensorId));
    };

    const handleUpdateSensor = (updatedSensor: Sensor) => {
        setSensors(sensors.map(sensor => (sensor.id === updatedSensor.id ? updatedSensor : sensor)));
    };

    const handleAddSensor = async (newSensorId: string) => {
        try {
            const fullSensor = await fetchSensorDetails(newSensorId, endUserId);
            setSensors([fullSensor, ...sensors]);
        } catch (error) {
            const errorMessage = error instanceof AxiosError && error.response?.data?.message
                ? error.response.data.message
                : "Failed to fetch full sensor details.";
            toast.error(errorMessage);
        }
    };

    const openAddSensorModal = () => {
        setIsEditMode(false);
        setCurrentSensor(undefined);
        setIsModalOpen(true);
    };

    const openEditSensorModal = (sensor: Sensor) => {
        setIsEditMode(true);
        setCurrentSensor(sensor);
        setIsModalOpen(true);
    };

    return (
        <>
            <div className="flex justify-around items-center flex-wrap">
                <button onClick={onBack} className="btn btn-ghost flex items-center gap-2">
                    <ArrowLeftIcon className="w-5 h-5"/>
                    <span className="hidden md:flex">End Users</span>
                </button>
                <div className="w-6/12 min-w-80">
                    <SearchBar onSearch={handleSearch} isLoading={isLoading}
                               placeholder="Search sensors by anything..."/>
                </div>
                <button onClick={openAddSensorModal} className="btn btn-ghost hidden md:flex">
                    <PlusIcon className="w-5 h-5"/>
                </button>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
                {sensors.length > 0 ? (
                    sensors.map((sensor) => (
                        <SensorCard
                            key={sensor.id}
                            endUserId={endUserId}
                            sensor={sensor}
                            onDelete={handleDeleteSensor}
                            onUpdateSensor={handleUpdateSensor}
                            openEditSensorModal={() => openEditSensorModal(sensor)}
                        />
                    ))
                ) : (
                    !isLoading && <p className="mt-10">No sensors available to show.</p>
                )}
            </div>
            {sensors.length > 0 && (
                <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            )}
            {isModalOpen && (
                <SensorModalForm
                    key={currentSensor?.id}
                    sensor={currentSensor}
                    endUserId={endUserId}
                    onClose={() => setIsModalOpen(false)}
                    onUpdate={handleUpdateSensor}
                    onAdd={handleAddSensor}
                    isEditMode={isEditMode}
                />
            )}
            <button
                onClick={openAddSensorModal}
                className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 md:hidden"
            >
                <PlusIcon className="w-6 h-6"/>
            </button>
        </>
    );
};

export default SensorContainer;